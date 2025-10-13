import { UserGameController } from '../controllers/UserGameController';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileUpdateUseCase } from '../core/useCases/Profile/ProfileUpdateUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';
import { UserGameRepoPrisma } from '../infra/Repositories/prisma/Repositories/UserGame-repo-prisma';

export function makeUserGameController() {
    const gamesRepo = new RawgRepostiry();
    const userGameRepo = new UserGameRepoPrisma(gamesRepo);

    const getProfile = new ProfileGetByIdUseCase(userGameRepo);
    const createProfiel = new ProfileCreateUseCase(userGameRepo);
    const updateProfile = new ProfileUpdateUseCase(userGameRepo);

    const getProfileGames = new UserGameController(getProfile, createProfiel, updateProfile);

    return getProfileGames;
}
