import { Router } from "express";
import authJWT from "../utils/authJWT.js";
import { authAdminRole } from "../utils/authRoles.js";
const router = Router();

import {
  getAllCategories,
  createNewCategory,
  deleteCategorById,
  updateCategoryById,
} from "../controllers/categoriesController.js";

router.get("/:id?", getAllCategories);

router.post("/", authJWT, authAdminRole, createNewCategory);

router.delete("/:id", authJWT, authAdminRole, deleteCategorById);

router.patch("/:id", authJWT, authAdminRole, updateCategoryById);

export default router;
