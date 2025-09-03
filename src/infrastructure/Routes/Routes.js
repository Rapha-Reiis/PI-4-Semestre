import { Router } from "express";
import UserRoutes from "./User.routes.js";
import GameRoutes from "./Games.routes.js";

class Routers {
    constructor() {
        this.routes = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.routes.use("/users", UserRoutes);
        this.routes.use("/games", GameRoutes);
    }
}

export default new Routers().routes;
