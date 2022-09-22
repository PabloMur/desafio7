import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { searchPetsAround } from "./controllers/algolia-controller";
import { authMiddleware } from "./middleware";
import {
  createUser,
  getProfile,
  getPets,
  getAllProfiles,
  checkProfile,
  updateUserProfile,
} from "./controllers/user-controller";
import {
  createAuth,
  authId,
  updatePassword,
} from "./controllers/auth-controller";
import {
  allPets,
  updatePetData,
  specificPet,
  createPet,
  deletePet,
} from "./controllers/pets-controller";
import { createReport } from "./controllers/report-controller";
import { sgMail } from "./lib/sendgrid";

const port = process.env.PORT || 3001;

const SECRET = process.env.SECRET;

const DEV = process.env.NODE_ENV;

const ruta = path.resolve(__dirname, "../dist");

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(express.static(ruta));

const hashearPassword = (text) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

app.get("/env", (req, res) => {
  res.json(DEV);
});

//obtenemos todos los usuarios
app.get("/users", async (req, res) => {
  const users = await getAllProfiles();
  res.json(users);
});

//obtenemos todas las mascotas
app.get("/pets", async (req, res) => {
  const allPetsRes = await allPets();
  res.json(allPetsRes);
});

//dar de alta un usuario en la base de datos
app.post("/auth", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const newUser = await createUser(fullname, email);
    const userId = await newUser.user.get("id");
    const passwordHashed = hashearPassword(password);
    const newAuth = await createAuth(userId, email, passwordHashed);

    res.json(newUser);
  } catch (error) {
    res.send({ error });
  }
});

//obtener token de usuario registrado
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passwordHasheado = hashearPassword(password);
  const auth = await authId(email, passwordHasheado);
  if (auth !== null) {
    const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: "User or Password incorrecto" });
  }
});

//checkea si el exite el mail que se le pasa
app.post("/auth/email-check", async (req, res) => {
  const emailVerification = await checkProfile(req.body.email);
  res.json(emailVerification);
});

//traer data del usuario-- tiene que estar autenticado
app.get("/auth/me", authMiddleware, async (req, res) => {
  const user = await getProfile(req._user.id);
  res.json(user);
});

//actualizar la data de un user
app.put("/auth/me", authMiddleware, async (req, res) => {
  const update = await updateUserProfile(req._user.id, req.body);
  res.json(update);
});

//crear una mascota
app.post("/pet", authMiddleware, async (req, res) => {
  const pet = await createPet(req._user.id, req.body);
  res.json(pet);
});

//obtener mis mascotas
app.get("/me/pets", authMiddleware, async (req, res) => {
  const pets = await getPets(req._user.id);
  res.json({
    pets: pets,
  });
});

//actualizar la data de una mascota
app.put("/me/pets/:petId", async (req, res) => {
  const { petId } = req.params;
  const updatedPet = await updatePetData(req.body, petId);
  res.json(updatedPet);
});

//Eliminar una mascota
app.delete("/me/pets/:petId", authMiddleware, async (req, res) => {
  const { petId } = req.params;
  const deletedPet = await deletePet(petId, req._user.id);
  res.json(deletedPet);
});

//endpoint para ver mascotas cerca de la ubicacion
app.get("/pets-around", async (req, res) => {
  const { lat, lng } = req.query;
  const response = await searchPetsAround(lat, lng);
  res.json(response);
});

app.post("/report", async (req, res) => {
  const report = await createReport(req.body);
  res.json(report);
});

app.get("*", (req, res) => {
  res.sendFile(ruta + "/index.html");
});

app.listen(port, () => {
  console.log(`Todo listo en el puerto: ${port}`);
});
