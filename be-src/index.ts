import * as express from "express";
import * as path from "path";

const port = process.env.PORT || 3000;

const SECRET = "AnitaLavaLaTina1313s";

const ruta = path.resolve(__dirname, "../dist");

console.log(process.env.NODE_ENV);

const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(express.static(ruta));

app.get("*", (req, res) => {
  res.sendFile(ruta + "/index.html");
});

app.listen(port, () => {
  console.log(`Todo listo en el puerto: ${port}`);
});
