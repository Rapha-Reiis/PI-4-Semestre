import { Router } from 'express';
import { makeLoginController } from '../../factories/makeLoginController';
import { LoginController } from '../../controllers/LoginController';

export class RoutesLogin {
    public routes = Router();
    private controller: LoginController = makeLoginController();
    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post('/', this.controller.Login.bind(this.controller));
    }
}

export default new RoutesLogin().routes;
