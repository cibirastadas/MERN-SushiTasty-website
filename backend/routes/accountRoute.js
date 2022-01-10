import { Router } from "express";

import {
  getAccountById,
  deleteAccountById,
  updateAccountPasswordById,
  updateAccountInformationById,
} from "../controllers/accountController.js";

const router = Router();

router.get("/:id", getAccountById);

router.delete("/:id", deleteAccountById);

router.patch("/:id", updateAccountInformationById);

router.patch("/:id", updateAccountPasswordById);

export default router;
