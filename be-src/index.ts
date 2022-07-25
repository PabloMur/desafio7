import * as express from "express";
import * as path from "path";
import * as cors from "cors";

const port = process.env.PORT || 3000;

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

app.get("/env", (req, res) => {
  res.json(DEV);
});

app.get("*", (req, res) => {
  res.sendFile(ruta + "/index.html");
});

app.listen(port, () => {
  console.log(`Todo listo en el puerto: ${port}`);
});
