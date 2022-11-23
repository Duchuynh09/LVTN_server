import express from "express";
import { createUser,compareUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signUp", createUser);
router.post("/signIn", compareUser);

export default router;
