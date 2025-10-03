import { profile } from 'console';
import { ProfileController } from '../controllers/ProfileController';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileUpdateUseCase } from '../core/useCases/Profile/ProfileUpdateUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';
import { ProfileUserRepository } from '../infra/Repositories/prisma/Repositories/ProfileUserRepository';

export function makeProfileController() {
    const gamesRepo = new RawgRepostiry();
    const profileRepo = new ProfileUserRepository(gamesRepo);

    const getProfile = new ProfileGetByIdUseCase(profileRepo);
    const createProfiel = new ProfileCreateUseCase(profileRepo);
    const updateProfile = new ProfileUpdateUseCase(profileRepo);

    const getProfileGames = new ProfileController(getProfile, createProfiel, updateProfile);

    return getProfileGames;
}
