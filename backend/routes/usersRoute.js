import { Router } from "express.js";
import { getAllUsers } from "../controllers/userController.js";
const router = Router();

router.post("/", getAllUsers);

export default router;
