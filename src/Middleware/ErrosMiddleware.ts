import { NextFunction, Request, Response } from 'express';
import { ErrorApp } from '../core/Error/ErrorApp';
import { LocalImageStorage } from '../infra/Image/LocalImageStorage';

class ErrorMiddleware {
    public errosMiddleware(error: Error & ErrorApp, req: Request, res: Response, next: NextFunction) {
        if (req.file) {
            console.log(req.file.filename);
            LocalImageStorage.deleteByIDImage(req.file.filename);
        }

        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode ? error.message : 'Internal Server Errora';
        return res.status(statusCode).json({
            message: message,
            details: error.details,
        });
    }
}

export default new ErrorMiddleware();
