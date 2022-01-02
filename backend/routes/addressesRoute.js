import { Router } from "express";
import paginateResults from "../utils/paginateResults.js";
import Address from "../models/addressModel.js";
import { authNormalRole } from "../utils/authRoles.js";
const router = Router();

import {
  getAllUserAddresses,
  createNewAddress,
  deleteAddressById,
  updateAddressById,
} from "../controllers/addressController.js";

router.get(
  "/:userId",
  authNormalRole,
  paginateResults(Address, "user"),
  getAllUserAddresses
);

router.post("/", authNormalRole, createNewAddress);

router.delete("/:id", authNormalRole, deleteAddressById);

router.patch("/:addressId", authNormalRole, updateAddressById);

export default router;
