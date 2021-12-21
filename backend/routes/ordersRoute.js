import { Router } from "express";
const router = Router();
import authRole from "../utils/authRole.js";

import {
  getAllOrders,
  getAllOrderEnums,
  getAllUserOrders,
  createNewOrder,
  updateOrderById,
} from "../controllers/ordersController.js";

router.get("/", authRole, getAllOrders);

router.get("/all-order-enums", getAllOrderEnums);

router.get("/:userId", getAllUserOrders);

router.post("/", createNewOrder);

router.patch("/:id", authRole, updateOrderById);

export default router;
