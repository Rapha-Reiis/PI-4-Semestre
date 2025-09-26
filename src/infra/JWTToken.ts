import { IToken } from '../adapters/IToken';
import jwt from 'jsonwebtoken';

export class JwtToken implements IToken {
    private token = jwt;

    assin(userID: string): string {
        return this.token.sign({ id: userID }, 'rapha', {
            expiresIn: '5d',
        });
    }
}
