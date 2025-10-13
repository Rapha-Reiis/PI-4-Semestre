import { UserRepoPrisma } from '../infra/Repositories/prisma/Repositories/user-repo-prisma';
import { prisma } from '../infra/Repositories/prisma/client';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';
import { HashBcrypt } from '../infra/hashBcrypt';
import { UserUniquenessService } from '../application/Services/UserUniquesService';
import { UserCreateUseCase } from '../core/useCases/user/UserCreate.useCase';
import { UserUpdateUseCase } from '../core/useCases/user/UserUpdate.useCase';
import { UserFindByIdUseCase } from '../core/useCases/user/UserFindById.useCase';
import { UserFindByEmailUseCase } from '../core/useCases/user/UserFindByEmail.useCase';
import { UserFindByUsernameUseCase } from '../core/useCases/user/UserFindByUsername.useCase';
import { UserController } from '../controllers/UserController';
import { GameListUseCase } from '../core/useCases/games/GameListUseCase';
import { GameGetGenresUseCase } from '../core/useCases/games/GameGetGenresUseCase';
import { GameGetByIdUseCase } from '../core/useCases/games/GameGetByIdUseCase';
import { GameController } from '../controllers/GameController';
import { UserGameCreateUsecase } from '../core/useCases/Profile/userGame-create.usecase';
import { UserGameGetByIdListUseCase } from '../core/useCases/Profile/userGame-getById-list.usecase';
import { UserGameController } from '../controllers/UserGameController';
import { UserGameUpdateUsecase } from '../core/useCases/Profile/userGame-update.usecase';
import { UserGameRepoPrisma } from '../infra/Repositories/prisma/Repositories/userGame-repo-prisma';
import { instanceToken } from './make-auth';
import { LoginController } from '../controllers/LoginController';
import { LoginCreateUseCase } from '../core/useCases/login/LoginCreate.useCase';

export function makeControllers() {
    // Repositorios
    const userRepo = new UserRepoPrisma(prisma);
    const gameRepo = new RawgRepostiry();
    const userGameRepo = new UserGameRepoPrisma(gameRepo);

    // Infras
    const hash = new HashBcrypt();
    const verifyUniques = new UserUniquenessService(userRepo);

    // usecases
    // Login
    const login = new LoginCreateUseCase(userRepo, hash, instanceToken);
    // Usuário
    const userCreate = new UserCreateUseCase(userRepo, hash, verifyUniques);
    const userUpdate = new UserUpdateUseCase(userRepo, hash, verifyUniques);
    const userFindById = new UserFindByIdUseCase(userRepo);
    const userFindByEmail = new UserFindByEmailUseCase(userRepo);
    const userFindByUsername = new UserFindByUsernameUseCase(userRepo);
    //Game
    const GameList = new GameListUseCase(gameRepo);
    const GameGenreList = new GameGetGenresUseCase(gameRepo);
    const gameGetById = new GameGetByIdUseCase(gameRepo);
    // UserGame
    const userGameGetProfileList = new UserGameGetByIdListUseCase(userGameRepo);
    const userGameCreate = new UserGameCreateUsecase(userGameRepo);
    const userGameUpdate = new UserGameUpdateUsecase(userGameRepo);
    // Controllers
    const userController = new UserController(userCreate, userUpdate, userFindById, userFindByEmail, userFindByUsername);
    const gameController = new GameController(GameList, GameGenreList, gameGetById);
    const userGameController = new UserGameController(userGameGetProfileList, userGameCreate, userGameUpdate);
    const loginController = new LoginController(login);

    return {
        userController,
        gameController,
        userGameController,
        loginController,
    };
}
