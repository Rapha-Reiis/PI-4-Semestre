import { Router } from "express";
import userRouter from "./User.routes.js";
const router = Router();

router.use("/users", userRouter);

export default router;
