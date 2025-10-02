import { UserProfileController } from '../controllers/UserProfileController';
import { ProfileGetByIdUseCase } from '../core/useCases/userGames/ProfileGetByIdUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';
import { ProfileUserRepository } from '../infra/Repositories/prisma/Repositories/ProfileUserRepository';

export function makeProfileController() {
    const gamesRepo = new RawgRepostiry();
    const profileRepo = new ProfileUserRepository(gamesRepo);

    const getProfile = new ProfileGetByIdUseCase(profileRepo);

    const getProfileGames = new UserProfileController(getProfile);

    return getProfileGames;
}
