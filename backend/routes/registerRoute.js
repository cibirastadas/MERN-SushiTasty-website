import { Router } from "express";
import { createNewUser } from "../controllers/registerController.js";
const router = Router();

router.post("/", createNewUser);

export default router;
