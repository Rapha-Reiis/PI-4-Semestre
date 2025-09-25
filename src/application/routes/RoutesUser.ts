import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { makeUserController } from '../../factories/makeUserController';
import { UserValidationMiddleware } from '../../Middleware/UserValidationMiddleware';
import { ZodUserValidation } from '../../infra/Validations/ZodValidations/ZodUserValidation';

class RoutesUser {
    public routes = Router();
    private userController: UserController = makeUserController();
    private validation: UserValidationMiddleware;
    constructor() {
        const instaceValid = new ZodUserValidation();
        this.validation = new UserValidationMiddleware(instaceValid);
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post('/', this.validation.ValidationCreate.bind(this.validation), this.userController.create.bind(this.userController));
    }
}

export default new RoutesUser().routes;
