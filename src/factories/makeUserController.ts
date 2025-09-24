import { UserController } from '../controllers/UserController';
import { CreateUserUseCase } from '../core/useCases/user/createUser.useCase';
import { UserRepositoryImpl } from '../infra/prisma/Repositories/UserRepositoryImpl';

export function makeUserController() {
    const userRepo = new UserRepositoryImpl();

    const createUser = new CreateUserUseCase(userRepo);

    return new UserController(createUser);
}
