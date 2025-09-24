import { UserController } from '../controllers/UserController';
import { CreateUserUseCase } from '../core/useCases/user/createUser.useCase';
import { HashBcrypt } from '../infra/hashBcrypt';
import { UserRepositoryImpl } from '../infra/prisma/Repositories/UserRepositoryImpl';

export function makeUserController() {
    const userRepo = new UserRepositoryImpl();
    const hash = new HashBcrypt();

    const createUser = new CreateUserUseCase(userRepo, hash);

    return new UserController(createUser);
}
