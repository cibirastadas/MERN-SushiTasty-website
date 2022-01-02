import { Router } from "express";
const router = Router();
import { authWorkerAndAdminRole } from "../utils/authRoles.js";

import {
  getAllOrders,
  getAllOrderEnums,
  getAllUserOrders,
  createNewOrder,
  updateOrderById,
} from "../controllers/ordersController.js";

router.get("/", authWorkerAndAdminRole, getAllOrders);

router.get("/all-order-enums", getAllOrderEnums);

router.get("/:userId", getAllUserOrders);

router.post("/", createNewOrder);

router.patch("/:id", authWorkerAndAdminRole, updateOrderById);

export default router;
