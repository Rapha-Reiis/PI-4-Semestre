import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { makeUserController } from '../../factories/makeUserController';
import { UserValidationMiddleware } from '../../Middleware/UserValidationMiddleware';
import { ZodUserValidation } from '../../infra/Validations/ZodValidations/User/ZodUserValidation';
import { AuthMiddleware } from '../../Middleware/AuthMiddleware';
import { isntaceToken } from '../../factories/makeAutn';
import th from 'zod/v4/locales/th.js';
import multer from 'multer';
import multerConfig from '../../infra/Config/Multer/multerConfig';

class RoutesUser {
    public routes = Router();
    private userController: UserController = makeUserController();
    private validation: UserValidationMiddleware;
    private auth = new AuthMiddleware(isntaceToken);
    private upload = multer(multerConfig);
    constructor() {
        const instaceValid = new ZodUserValidation();
        this.validation = new UserValidationMiddleware(instaceValid);
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post(
            '/',
            this.upload.single('profile'),
            this.validation.ValidationCreate.bind(this.validation),
            this.userController.create.bind(this.userController),
        );

        this.routes.put(
            '/update/:id',
            this.validation.ValidationUpdate.bind(this.validation),
            this.userController.update.bind(this.userController),
        );
        this.routes.get('/:id', this.auth.auth, this.userController.findById.bind(this.userController));
        this.routes.get(
            '/email/:email',
            this.validation.ValidationEmail.bind(this.validation),
            this.userController.findByEmail.bind(this.userController),
        );
        this.routes.get('/username/:username', this.userController.findByUsername.bind(this.userController));
    }
}

export default new RoutesUser().routes;
