import { Router } from "express";
const router = Router();

import { findUser } from "../controllers/loginsController.js";

router.post("/", findUser);

export default router;
