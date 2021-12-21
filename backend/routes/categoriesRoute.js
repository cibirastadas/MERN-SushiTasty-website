import { Router } from "express";
const router = Router();
/* middlewares */
import authJWT from "../utils/authJWT.js";

import {
  getAllCategories,
  createNewCategory,
  deleteCategorykById,
  updateCategoryById,
} from "../controllers/categoriesController.js";

/* Gets all categories */
router.get("/:id?", getAllCategories);

/* Create new categorie */
router.post("/", authJWT, createNewCategory);

/* Delete category */
router.delete("/:id", authJWT, deleteCategorykById);

/* Update category  */
router.patch("/:id", authJWT, updateCategoryById);

export default router;
