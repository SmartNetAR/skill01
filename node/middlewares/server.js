const express = require("express");

const app = express();

const port = 5000;

// const isAuth = () => undefined;
const isAuth = () => ({ name: "juan", role: 2 });

const auth = (req, res, next) => {
  const user = isAuth();
  if (user) {
    res.locals.user = user;
    return next();
  }

  res.status(403).json("No está autenticado");
};

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.json("Home");
});

app.get("/test", auth, (req, res) => {
  res.json(res.locals.user);
});

app.get("/test-2", auth, (req, res) => {
  console.log(res.locals.user.name);
  res.json("test-2");
});

app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));
