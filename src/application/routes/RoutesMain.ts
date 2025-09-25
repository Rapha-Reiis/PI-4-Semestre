import { Router } from 'express';
import RoutesUser from './RoutesUser';
import RoutesLogin from './Routes.Login';

class MainRoutes {
    public routes = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.use('/users', RoutesUser);
        this.routes.use('/login', RoutesLogin);
    }
}

export default new MainRoutes().routes;
