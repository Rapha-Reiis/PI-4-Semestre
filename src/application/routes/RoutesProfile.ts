import { Router } from 'express';
import { makeProfileController } from '../../factories/makeProfileController';

class RoutesProfile {
    public routes = Router();
    private profileController = makeProfileController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.routes.get('/:userId', this.profileController.userProfile);
        this.routes.post('/', this.profileController.createProfile);
        this.routes.put('/update/:id', this.profileController.updateProfiel);
    }
}

export default new RoutesProfile().routes;
