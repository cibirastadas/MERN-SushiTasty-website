import { Router } from "express";
const router = Router();

import {
  getAllUserOrderProducts,
  getAllOrderProducts,
} from "../controllers/orderProductsController.js";

router.get("/:userId", getAllUserOrderProducts);

router.get("/", getAllOrderProducts);

export default router;
