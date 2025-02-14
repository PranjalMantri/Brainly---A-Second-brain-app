import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/user.controller";
import { validateResource } from "../middleware/validateResource";
import { CreateUserSchema, LoginUserSchema } from "../schema/user.schema";
import { verifyJwt } from "../middleware/auth";

const router = Router();

router.post("/signup", validateResource(CreateUserSchema), registerUser);
router.post("/signin", validateResource(LoginUserSchema), loginUser);
router.get("/me", verifyJwt, getUser);

export default router;
