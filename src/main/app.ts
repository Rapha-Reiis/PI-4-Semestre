import express, { Express } from 'express';

import { resolve } from 'path';
import RoutesMain from '../application/routes/RoutesMain';
import ErrosMiddleware from '../Middleware/ErrosMiddleware';

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlerwares();
        this.routes();
        this.errors();
    }

    private middlerwares() {
        this.app.use(express.json());
        this.app.use('/perfil-image', express.static(resolve(__dirname, '..', 'uploads')));
    }

    private routes() {
        this.app.use(RoutesMain);
    }

    private errors() {
        this.app.use(ErrosMiddleware.errosMiddleware);
    }
}

export default new App().app;
