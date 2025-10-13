import { Router } from 'express';
import RoutesUser from './routes-user';
import RoutesLogin from './routes-login';
import RoutesGames from './routes-game';
import RoutesProfile from './routes-userGame';

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
