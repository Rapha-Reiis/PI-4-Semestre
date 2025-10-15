import { Router } from 'express';
import { makeControllers } from '../../factories/make-Controllers';
import { ValidateRequest } from '../../Middleware/validate-body.middleware';
import { createBodyMandatory } from '../../core/Entities/review-entity';

class RoutesReview {
    public routes = Router();
    private controller = makeControllers().reviewController;

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.routes.post('/', ValidateRequest.validateBody([], createBodyMandatory), this.controller.create);
    }
}

export default new RoutesReview().routes;
