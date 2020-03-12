const express = require("express");

const app = express();

const port = 5000;

const isAuth = () => ({ name: "nombre" });

const auth = (req, res, next) => {
  if (isAuth()) next();
  return res.json("No está autenticado");
};

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.json("Home");
});

app.get("/test", auth, (req, res) => {
  res.json("Test");
});

app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));
