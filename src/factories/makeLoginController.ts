import { LoginController } from '../controllers/LoginController';
import { LoginCreateUseCase } from '../core/useCases/login/LoginCreate.useCase';
import { HashBcrypt } from '../infra/hashBcrypt';
import { UserRepoPrisma } from '../infra/Repositories/prisma/Repositories/user-repo-prisma';

import { isntaceToken } from './makeAutn';

export function makeLoginController() {
    const userRepo = new UserRepoPrisma();
    const hash = new HashBcrypt();

    const login = new LoginCreateUseCase(userRepo, hash, isntaceToken);

    return new LoginController(login);
}
