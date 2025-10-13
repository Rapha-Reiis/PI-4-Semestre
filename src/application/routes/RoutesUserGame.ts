import { Router } from 'express';
import { makeUserGameController } from '../../factories/makeUserGameController';

class RoutesUserGame {
    public routes = Router();
    private userGameController = makeUserGameController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.routes.get('/', this.userGameController.getProfileList);
        this.routes.post('/', this.userGameController.createProfile);
        this.routes.put('/update/:id', this.userGameController.updateProfiel);
    }
}

export default new RoutesUserGame().routes;
