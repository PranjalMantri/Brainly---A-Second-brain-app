import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { validateResource } from "../middleware/validateResource";
import { CreateUserSchema } from "../schema/user.schema";

const router = Router();

router.post("/signup", validateResource(CreateUserSchema), registerUser);

export default router;
