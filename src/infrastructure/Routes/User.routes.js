import { Router } from "express";

class RouterUser {
    constructor() {
        this.routes = Router();
    }

    initRoutes() {
        this.routes.use("/");
    }
}

export default new RouterUser().routes;
