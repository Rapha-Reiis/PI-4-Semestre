import { Router } from 'express';
import RoutesUser from './RoutesUser';
import RoutesLogin from './Routes.Login';
import RoutesGames from './Routes.games';
import RoutesProfile from './RoutesProfile';

class MainRoutes {
    public routes = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.use('/users', RoutesUser);
        this.routes.use('/login', RoutesLogin);
        this.routes.use('/games', RoutesGames);
        this.routes.use('/profile', RoutesProfile);
    }
}

export default new MainRoutes().routes;
