import { UserUniquenessService } from '../application/Services/UserUniquesService';
import { UserController } from '../controllers/UserController';
import { UserCreateUseCase } from '../core/useCases/user/UserCreate.useCase';
import { UserFindByEmailUseCase } from '../core/useCases/user/UserFindByEmail.useCase';
import { UserFindByIdUseCase } from '../core/useCases/user/UserFindById.useCase';
import { UserFindByUsernameUseCase } from '../core/useCases/user/UserFindByUsername.useCase';
import { UserUpdateUseCase } from '../core/useCases/user/UserUpdate.useCase';
import { HashBcrypt } from '../infra/hashBcrypt';
import { LocalImageStorage } from '../infra/Image/LocalImageStorage';
import { UserRepoPrisma } from '../infra/Repositories/prisma/Repositories/user-repo-prisma';

export function makeUserController() {
    // infra
    const userRepo = new UserRepoPrisma();
    const hash = new HashBcrypt();
    // service
    const verify = new UserUniquenessService(userRepo);
    const storage = new LocalImageStorage();
    // useCases
    const createUser = new UserCreateUseCase(userRepo, hash, verify);
    const updateUser = new UserUpdateUseCase(userRepo, hash, verify);
    const FId = new UserFindByIdUseCase(userRepo);
    const FEmail = new UserFindByEmailUseCase(userRepo);
    const FUsername = new UserFindByUsernameUseCase(userRepo);

    return new UserController(createUser, updateUser, FId, FEmail, FUsername);
}
