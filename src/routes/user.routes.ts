import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { validateResource } from "../middleware/validateResource";
import { CreateUserSchema, LoginUserSchema } from "../schema/user.schema";

const router = Router();

router.post("/signup", validateResource(CreateUserSchema), registerUser);
router.post("/signin", validateResource(LoginUserSchema), loginUser);

export default router;
