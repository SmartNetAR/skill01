"use strict";

const express = require("express");
const router = express.Router();
const authController = require("./entity/user/controller");
const authenticator = require("./middleware/authenticator.js");

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/logout", authenticator.auth , authController.logout);
router.get("/about", authenticator.auth, (req, res) =>  res.status(200).json({message: "Proyecto de prueba utilizando mysql y redis para auth"}));
router.get("/", (req, res) => {
  res.status(200).json({
    routes: {
      login: {
        method: "post",
        path: "/auth/login",
        auth_required: "no"
      },
      register: {
        method: "post",
        path: "/auth/register",
        auth_required: "no"
      },
      logout: {
        method: "post",
        path: "/auth/logout",
        auth_required: "yes"
      },
      about: {
        method: "get",
        path: "/about",
        auth_required: "yes"
      },
    }
  })
})

module.exports = router;
