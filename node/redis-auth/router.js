"use strict";

const express = require("express");
const router = express.Router();

router.post("/auth/login", require("./entity/user/controller").login);
router.post("/auth/register", require("./entity/user/controller").register);

module.exports = router;
