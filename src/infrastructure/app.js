import express from "express";
import Routes from "./Routes/Routes.js";

class App {
    constructor() {
        this.app = express();
        this.midleware();
        this.routes();
    }

    midleware() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(Routes);
    }
}

export default new App().app;
