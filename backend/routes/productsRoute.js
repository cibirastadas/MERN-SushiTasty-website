import { Router } from "express";
const router = Router();
import authRole from "../utils/authRole.js";
import authJWT from "../utils/authJWT.js";

import {
  getAllProducts,
  getAllSelectedProducts,
  createNewProduct,
  deleteProductById,
  updateProductById,
} from "../controllers/productsController.js";

router.get("/", getAllProducts);

router.post("/selected-products", authJWT, getAllSelectedProducts);

router.post("/", authJWT, authRole, createNewProduct);

router.delete("/:id", authJWT, authRole, deleteProductById);

router.patch("/:id", authJWT, authRole, updateProductById);

export default router;
