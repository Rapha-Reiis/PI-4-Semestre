import { Router } from 'express';
import { makeGamesController } from '../../factories/makeGameController';

class RoutesGames {
    public routes = Router();
    private controllerGame = makeGamesController();
    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.get('/', this.controllerGame.ListOfGame);
        this.routes.get('/genres', this.controllerGame.ListGenre);
        this.routes.get('/:id', this.controllerGame.GameById);
    }
}

export default new RoutesGames().routes;
