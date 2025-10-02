import { IToken } from '../adapters/IToken';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { ErrorUnauthorized } from '../core/Error/ErrorUnauthorized';
import { ErrorBadRequest } from '../core/Error/ErrorBadRequest';

export class JwtToken implements IToken {
    private token = jwt;
    private secret = process.env.SECRET_KEY;

    assin(userID: string): string {
        const secret = process.env.SECRET_KEY ?? 'rapha';
        return this.token.sign({ id: userID }, secret, {
            expiresIn: '5d',
        });
    }

    verify(token: string): void {
        try {
            if (!this.secret) throw new ErrorBadRequest('Segredo não está definido no env');
            this.token.verify(token, this.secret);
        } catch (err) {
            throw new ErrorUnauthorized('Token não autorizado');
        }
    }
}
