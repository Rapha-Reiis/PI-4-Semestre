import { UserProfileController } from '../controllers/UserProfileController';
import { ProfileGetByIdUseCase } from '../core/useCases/userGames/ProfileGetByIdUseCase';
import { ProfileUserRepository } from '../infra/prisma/Repositories/ProfileUserRepository';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';

export function makeProfileController() {
    const gamesRepo = new RawgRepostiry();
    const profileRepo = new ProfileUserRepository(gamesRepo);

    const getProfile = new ProfileGetByIdUseCase(profileRepo);

    const getProfileGames = new UserProfileController(getProfile);

    return getProfileGames;
}
