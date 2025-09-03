import { Router } from "express";
import UserController from "../../presentation/UserController.js";

const routes = Router();

routes.get("/", UserController.getUsers);

export default routes;
