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

    async ValidationUpdate(req: Request, res: Response, next: NextFunction) {
        console.log('esout auqi');
        if (!req.body) {
            throw new ErrorBadRequest('Não foi passado o body corretamente');
        }
        if (!req.params) {
            throw new ErrorBadRequest('Não foi passado os parametros corretamente');
        }

        const details = this.validate.Update(req.body);

        if (details) {
            throw new ErrorBadRequest(undefined, details);
        }

        next();
    }

    async ValidationEmail(req: Request, res: Response, next: NextFunction) {
        if (!req.params) {
            throw new ErrorBadRequest('Email não foi passado corretamente');
        }

        const details = this.validate.Email(req.body);

        if (details) {
            throw new ErrorBadRequest(undefined, details);
        }

        next();
    }
}
