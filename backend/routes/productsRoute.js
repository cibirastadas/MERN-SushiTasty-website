const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController")
      /* Gets all products */
      router.get("/", productsController.getAllProducts)
      
      /* Gets all sushies */
      router.get("/sushies", productsController.getAllSushies)

      /* Gets all salads */
      router.get("/salads", productsController.getAllSalads)

      /* Gets all Soups */
      router.get("/soups", productsController.getAllSoups)

      /* Gets all sushies Sets */
      router.get("/sushies-sets", productsController.getAllSushiesSets)

      /* Gets all Drinks */
      router.get("/drinks", productsController.getAllDrinks)

module.exports = router