import { Router } from "express";
const router = Router();
import { authAdminRole } from "../utils/authRoles.js";
import authJWT from "../utils/authJWT.js";
import paginateResults from "../utils/paginateResults.js";
import { Product } from "../models/productModel.js";
import {
  getAllProducts,
  getAllSelectedProducts,
  createNewProduct,
  deleteProductById,
  updateProductById,
  getAllProductsByCategory,
} from "../controllers/productsController.js";

router.get("/", paginateResults(Product), getAllProducts);

router.get(
  "/:categoryId",
  paginateResults(Product, "categoryId"),
  getAllProductsByCategory
);

router.post("/selected-products", authJWT, getAllSelectedProducts);

router.post("/", authJWT, authAdminRole, createNewProduct);

router.delete("/:id", authJWT, authAdminRole, deleteProductById);

router.patch("/:id", authJWT, authAdminRole, updateProductById);

export default router;
