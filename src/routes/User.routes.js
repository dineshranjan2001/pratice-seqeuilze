import { Router } from "express";
import { createUser, findById } from "../controllers/User.controller.js";
const router=Router();

router.post("/save-user",createUser);
router.get("/get-user/:userId",findById);

export default router;