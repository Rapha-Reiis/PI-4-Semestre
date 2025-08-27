import express from "express";

class App {
    constructor() {
        this.app = express();
        this.midleware();
        this.routes();
    }

    midleware() {
        this.app.use(express.json());
    }

    routes() {}
}

export default new App().app;
