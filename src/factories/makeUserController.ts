import { UserUniquenessService } from '../application/Services/UserUniquesService';
import { UserController } from '../controllers/UserController';
import { UserCreateUseCase } from '../core/useCases/user/UserCreate.useCase';
import { UserFindByEmailUseCase } from '../core/useCases/user/UserFindByEmail.useCase';
import { UserFindByIdUseCase } from '../core/useCases/user/UserFindById.useCase';
import { UserFindByUsernameUseCase } from '../core/useCases/user/UserFindByUsername.useCase';
import { UserUpdateUseCase } from '../core/useCases/user/UserUpdate.useCase';
import { HashBcrypt } from '../infra/hashBcrypt';
import { UserRepositoryImpl } from '../infra/prisma/Repositories/UserRepositoryImpl';

export function makeUserController() {
    const userRepo = new UserRepositoryImpl();
    const hash = new HashBcrypt();

    const verify = new UserUniquenessService(userRepo);

    const createUser = new UserCreateUseCase(userRepo, hash, verify);
    const updateUser = new UserUpdateUseCase(userRepo, hash, verify);
    const FId = new UserFindByIdUseCase(userRepo);
    const FEmail = new UserFindByEmailUseCase(userRepo);
    const FUsername = new UserFindByUsernameUseCase(userRepo);

    return new UserController(createUser, updateUser, FId, FEmail, FUsername);
}
