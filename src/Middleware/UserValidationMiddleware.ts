import { NextFunction, Request, Response } from 'express';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';
import { IUserValidationRequest } from '../adapters/Validations/IUserValidationRequest';

export class UserValidationMiddleware {
    constructor(private validate: IUserValidationRequest) {}

    async ValidationCreate(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            throw new ErrorBadRequest('Não foi passado o body corretamente');
        }
        const details = this.validate.Create(req.body);

        if (details) {
            throw new ErrorBadRequest(undefined, details);
        }
        next();
    }
}
