import { UserRepoPrisma } from '../infra/Repositories/prisma/Repositories/user-repo-prisma';
import { prisma } from '../infra/Repositories/prisma/client';
import { RawgRepostiry } from '../infra/Repositories/Games/rawg-repository';
import { HashBcrypt } from '../infra/hash-bycript';
import { UserUniquenessService } from '../application/Services/user-unique-services';
import { UserCreateUseCase } from '../core/useCases/user/user-create.usecase';
import { UserUpdateUseCase } from '../core/useCases/user/user-update.usecase';
import { UserFindByIdUseCase } from '../core/useCases/user/user-find-by-id.usecase';
import { UserFindByEmailUseCase } from '../core/useCases/user/user-find-by-email.usecase';
import { UserFindByUsernameUseCase } from '../core/useCases/user/user-find-by-username.usecase';
import { UserController } from '../controllers/user-controller';
import { GameListUseCase } from '../core/useCases/games/game-list.usecase';
import { GameGetGenresUseCase } from '../core/useCases/games/game-get-genres.usecase';
import { GameGetByIdUseCase } from '../core/useCases/games/game-get-by-id.usecase';
import { GameController } from '../controllers/game-controller';
import { UserGameCreateUsecase } from '../core/useCases/userGame/userGame-create.usecase';
import { UserGameGetByIdListUseCase } from '../core/useCases/userGame/userGame-getById-list.usecase';
import { UserGameController } from '../controllers/userGame-controller';
import { UserGameUpdateUsecase } from '../core/useCases/userGame/userGame-update.usecase';
import { instanceToken } from './make-auth';
import { LoginController } from '../controllers/login-controller';
import { LoginCreateUseCase } from '../core/useCases/login/login-create.usecase';
import { UserGameRepoPrisma } from '../infra/Repositories/prisma/Repositories/UserGame-repo-prisma';
import { ReviwRepository } from '../infra/Repositories/prisma/Repositories/review-repo.prisma';
import { ReviewCreateUsecase } from '../core/useCases/review/review-create.usecase';
import { ReviewController } from '../controllers/review-controller';
import { ReviewUpdateUsecase } from '../core/useCases/review/review-update.usecase';

export function makeControllers() {
    // Repositorios
    const userRepo = new UserRepoPrisma(prisma);
    const gameRepo = new RawgRepostiry();
    const userGameRepo = new UserGameRepoPrisma(gameRepo);
    const reviewRepo = new ReviwRepository(prisma);

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
    //
    const reviewCreate = new ReviewCreateUsecase(reviewRepo, userRepo);
    const reviewUpdate = new ReviewUpdateUsecase(reviewRepo);

    // Controllers
    const userController = new UserController(userCreate, userUpdate, userFindById, userFindByEmail, userFindByUsername);
    const gameController = new GameController(GameList, GameGenreList, gameGetById);
    const userGameController = new UserGameController(userGameGetProfileList, userGameCreate, userGameUpdate);
    const loginController = new LoginController(login);
    const reviewController = new ReviewController(reviewCreate, reviewUpdate);

    return {
        userController,
        gameController,
        userGameController,
        loginController,
        reviewController,
    };
}
