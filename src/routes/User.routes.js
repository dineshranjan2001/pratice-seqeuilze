import { Router } from "express";
import { createUser } from "../controllers/User.controller.js";
const router=Router();

router.post("/save-user",createUser);

export default router;