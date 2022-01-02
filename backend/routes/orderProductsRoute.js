import { Router } from "express";
import paginateResults from "../utils/paginateResults.js";
import Order from "../models/orderModel.js";
import { authWorkerAndAdminRole, authAdminRole } from "../utils/authRoles.js";
const router = Router();

import {
  getAllUserOrderProducts,
  getAllOrderProducts,
  getAllFilteredOrderProducts,
} from "../controllers/orderProductsController.js";
router.get(
  "/courier",
  authWorkerAndAdminRole,
  paginateResults(
    Order,
    "trackOrder",
    "-deliveryAddress.addressType -deliveryAddress.updatedAt -deliveryAddress.createdAt -deliveryAddress.user",
    ["Prepared", "Delivery"],
    { deliveryType: "DeliveryHome" }
  ),
  getAllFilteredOrderProducts
);
router.get(
  "/kitchenWorker",
  authWorkerAndAdminRole,
  paginateResults(
    Order,
    "trackOrder",
    "-deliveryAddress.addressType -deliveryAddress.updatedAt -deliveryAddress.createdAt -deliveryAddress.user",
    ["Ordered", "Prepared", "Preparing"]
  ),
  getAllFilteredOrderProducts
);
router.get(
  "/:userId",
  paginateResults(
    Order,
    "user",
    "total deliveryType trackOrder paymentMethod timeToMake createdAt deliveryAddress.street deliveryAddress.city"
  ),
  getAllUserOrderProducts
);

router.get(
  "/",
  authAdminRole,
  paginateResults(
    Order,
    "",
    "-deliveryAddress.addressType -deliveryAddress.updatedAt -deliveryAddress.createdAt -deliveryAddress.user"
  ),
  getAllOrderProducts
);

export default router;
