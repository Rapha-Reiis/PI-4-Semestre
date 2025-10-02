import { Router } from 'express';
import { makeProfileController } from '../../factories/makeProfileController';

class RoutesUserProfile {
    public routes = Router();
    private profileController = makeProfileController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.routes.use('/:userId', this.profileController.userProfile);
    }
}

export default new RoutesUserProfile().routes;
