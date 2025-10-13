import { Router } from 'express';
import { UserValidationMiddleware } from '../../Middleware/UserValidationMiddleware';
import { ZodUserValidation } from '../../infra/Validations/ZodValidations/User/ZodUserValidation';
import { AuthMiddleware } from '../../Middleware/AuthMiddleware';
import multer from 'multer';
import multerConfig from '../../infra/config/multer/multerConfig';
import { controllers } from '../../factories/controllers';
import { instanceToken } from '../../factories/make-auth';

class RoutesUser {
    public routes = Router();
    private userController = controllers.userController;
    private validation: UserValidationMiddleware;
    private auth = new AuthMiddleware(instanceToken);
    private upload = multer(multerConfig);
    constructor() {
        const instaceValid = new ZodUserValidation();
        this.validation = new UserValidationMiddleware(instaceValid);
        console.log('oi');
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post(
            '/',
            this.upload.single('profile'),
            this.validation.ValidationCreate.bind(this.validation),
            this.userController.create,
        );

        this.routes.put(
            '/update/:id',
            this.upload.single('profile'),
            this.validation.ValidationUpdate.bind(this.validation),
            this.userController.update,
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
