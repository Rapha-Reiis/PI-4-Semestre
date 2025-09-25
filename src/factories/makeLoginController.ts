import { LoginController } from '../controllers/LoginController';
import { LoginCreateUseCase } from '../core/useCases/login/LoginCreate.useCase';
import { HashBcrypt } from '../infra/hashBcrypt';
import { UserRepositoryImpl } from '../infra/prisma/Repositories/UserRepositoryImpl';

export function makeLoginController() {
    const userRepo = new UserRepositoryImpl();
    const hash = new HashBcrypt();

    const login = new LoginCreateUseCase(userRepo, hash);

    return new LoginController(login);
}
