const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController")

     /* Gets all the products */
     router.get("/", homeController.getAllProducts)
  
  module.exports = router