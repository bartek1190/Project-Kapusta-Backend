const express = require("express");
const { userSignup } = require("../services/user/user");

const router = express.Router();

router.post("/signup", userSignup);

module.exports = router;
