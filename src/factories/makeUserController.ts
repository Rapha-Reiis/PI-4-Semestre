import { UserUniquenessService } from '../application/Services/UserUniquesService';
import { UserController } from '../controllers/UserController';
import { CreateUserUseCase } from '../core/useCases/user/createUser.useCase';
import { HashBcrypt } from '../infra/hashBcrypt';
import { UserRepositoryImpl } from '../infra/prisma/Repositories/UserRepositoryImpl';

export function makeUserController() {
    const userRepo = new UserRepositoryImpl();
    const hash = new HashBcrypt();

    const verify = new UserUniquenessService(userRepo);

    const createUser = new CreateUserUseCase(userRepo, hash, verify);

    return new UserController(createUser);
}
