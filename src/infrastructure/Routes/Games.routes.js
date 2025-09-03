import { Router } from "express";
import { createGames } from "../../presentation/GameController.js";

const routes = Router();

routes.post("/", createGames);

export default routes;
