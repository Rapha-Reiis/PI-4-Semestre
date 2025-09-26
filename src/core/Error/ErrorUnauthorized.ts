import { ErrorApp } from './ErrorApp';

export class ErrorUnauthorized extends ErrorApp {
    constructor(msgText: string) {
        super(msgText, 401);
    }
}
