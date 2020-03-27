"use strict";

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");

const app = express();
const router = require("./router.js");

app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);

app.use("/", router);

http.createServer(app).listen(config.port, () => console.log(`Escuchando en el puerto ${config.port}`));
