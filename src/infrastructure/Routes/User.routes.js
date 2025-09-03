import { Router } from "express";
import { getUsers } from "../../presentation/UserController.js";

const routes = Router();

routes.get("/", getUsers);

export default routes;
