import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { makeUserController } from '../../factories/makeUserController';

class RoutesUser {
    public routes = Router();
    private userController: UserController = makeUserController();
    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post('/', this.userController.create.bind(this.userController));
    }
}

export default new RoutesUser().routes;
