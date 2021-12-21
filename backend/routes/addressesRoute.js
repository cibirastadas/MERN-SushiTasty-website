import { Router } from "express";
const router = Router();
/* middlewares */

import {
  getAllUserAddresses,
  createNewAddress,
  deleteAddressById,
  updateAddressById,
} from "../controllers/addressController.js";

router.get("/:userId", getAllUserAddresses);

router.post("/", createNewAddress);

router.delete("/:id", deleteAddressById);

router.patch("/:addressId", updateAddressById);

export default router;
