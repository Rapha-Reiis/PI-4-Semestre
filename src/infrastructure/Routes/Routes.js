import { Router } from "express";
import UserRoutes from "./User.routes";

class Routers {
    constructor() {
        this.routes = Router();
    }

    initRoutes() {
        this.routes.use("/users", UserRoutes);
    }
}

export default new Routers().routes;
