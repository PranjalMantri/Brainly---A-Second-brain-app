import { Router } from "express";
import { Request, Response } from "express";
import { registerUser } from "../controllers/user.controller";

const router = Router();

router.post("/signup", registerUser);

export default router;
