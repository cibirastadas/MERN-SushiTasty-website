const express = require("express");
const router = express.Router();

const loginsController = require("../controllers/loginsController")

router.post("/", loginsController.findUser)

module.exports = router