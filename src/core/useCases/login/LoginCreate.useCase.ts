import { IHash } from '../../../adapters/IHash';
import { IUserRepository } from '../../../adapters/Repositories/IUserRepository';
import { LoginEntity } from '../../Entities/LoginEntity';
import { ErrorNotFound } from '../../Error/ErrorNotFound';
import { ErrorBadRequest } from '../../Error/ErrorBadRequest';
import { IToken } from '../../../adapters/IToken';
import { ErrorUnauthorized } from '../../Error/ErrorUnauthorized';

export class LoginCreateUseCase {
    constructor(
        private userRespo: IUserRepository,
        private hash: IHash,
        private token: IToken,
    ) {}

    async execute(data: LoginEntity): Promise<Object> {
        const user = await this.userRespo.findByEmailWithPassword(data.email);
        if (!user) {
            throw new ErrorUnauthorized('Usuário não autorizado, verifique email e senha');
        }
        //
        const compare = await this.hash.compare(data.password, user.password);
        //
        if (!compare) throw new ErrorBadRequest('Senha ou email está incorreto');

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            premium: user.premium,
            token: this.token.assin(user.id),
        };
    }
}
