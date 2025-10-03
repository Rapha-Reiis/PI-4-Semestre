import { ProfileController } from '../controllers/ProfileController';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';
import { ProfileUserRepository } from '../infra/Repositories/prisma/Repositories/ProfileUserRepository';

export function makeProfileController() {
    const gamesRepo = new RawgRepostiry();
    const profileRepo = new ProfileUserRepository(gamesRepo);

    const getProfile = new ProfileGetByIdUseCase(profileRepo);
    const createProfiel = new ProfileCreateUseCase(profileRepo);

    const getProfileGames = new ProfileController(getProfile, createProfiel);

    return getProfileGames;
}
