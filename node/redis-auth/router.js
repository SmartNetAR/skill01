"use strict";

const express = require("express");
const router = express.Router();

router.post("/auth/login", require("./entity/user/controller").login);
router.post("/auth/register", require("./entity/user/controller").register);
// router.post("/auth/logout", auth, require("./entity/user/controller").logout);

module.exports = router;
