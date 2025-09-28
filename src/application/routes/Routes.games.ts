import { Router } from 'express';
import { makeGamesController } from '../../factories/makeGameController';

class RoutesGames {
    public routes = Router();
    private controllerGame = makeGamesController();
    constructor() {
        console.log('cheguei na rota');
        this.initRoutes();
    }

    initRoutes() {
        this.routes.get('/', this.controllerGame.ListOfGame);
    }
}

export default new RoutesGames().routes;
