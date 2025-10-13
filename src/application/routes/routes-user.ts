import { Router } from 'express';
import { AuthMiddleware } from '../../Middleware/auth.middleware';
import multer from 'multer';
import multerConfig from '../../infra/config/multer/multer-config';
import { controllers } from '../../factories/controllers';
import { instanceToken } from '../../factories/make-auth';
import { userCreateBody, userUpdateBody } from '../../core/Entities/user-entity';
import { ValidateRequest } from '../../Middleware/validate-body.middleware';

class RoutesUser {
    public routes = Router();
    private userController = controllers.userController;
    private auth = new AuthMiddleware(instanceToken);
    private upload = multer(multerConfig);
    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post(
            '/',
            this.upload.single('profile'),
            ValidateRequest.validateBody(['bio'], userCreateBody),
            this.userController.create,
        );

        this.routes.put(
            '/update/:idUser',
            this.upload.single('profile'),
            ValidateRequest.validateBody(userUpdateBody),
            this.userController.update,
        );
        this.routes.get('/:id', this.auth.auth, this.userController.findById);
        this.routes.get('/email/:email', this.userController.findByEmail);
        this.routes.get('/username/:username', this.userController.findByUsername);
    }
}

export default new RoutesUser().routes;
