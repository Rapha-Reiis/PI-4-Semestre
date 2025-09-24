import { NextFunction, Request, Response } from 'express';
import { ErrorApp } from '../core/Error/ErrorApp';

class ErrorMiddleware {
    public errosMiddleware(error: Error & ErrorApp, req: Request, res: Response, next: NextFunction) {
        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode ? error.message : 'Internal Server Error';
        return res.status(statusCode).json({
            message: message,
            details: error.details,
        });
    }
}

export default new ErrorMiddleware();
