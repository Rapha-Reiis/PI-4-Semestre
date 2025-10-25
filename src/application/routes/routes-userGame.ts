import { Router } from 'express';
import { controllers } from '../../factories/controllers';

class RoutesUserGame {
    public routes = Router();
    private userGameController = controllers.userGameController;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.routes.get('/', this.userGameController.getProfileList);
        this.routes.post('/', this.userGameController.createProfile);
        this.routes.put('/update/:id', this.userGameController.updateProfiel);
        this.routes.get('/total', this.userGameController.totalGameStatus);
    }
}

export default new RoutesUserGame().routes;
