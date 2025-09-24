import { Router } from 'express';
import RoutesUser from './RoutesUser';

class MainRoutes {
    public routes = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.use('/users', RoutesUser);
    }
}

export default new MainRoutes().routes;
