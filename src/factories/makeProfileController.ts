import { UserProfileController } from '../controllers/UserProfileController';
import { getUserProfileUseCase } from '../core/useCases/userGames/getUserProfile';
import { ProfileUserRepository } from '../infra/prisma/Repositories/ProfileUserRepository';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';

export function makeProfileController() {
    const gamesRepo = new RawgRepostiry();
    const profileRepo = new ProfileUserRepository(gamesRepo);

    const getProfile = new getUserProfileUseCase(profileRepo);

    const getProfileGames = new UserProfileController(getProfile);

    return getProfileGames;
}
