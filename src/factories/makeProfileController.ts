import { profile } from 'console';
import { ProfileController } from '../controllers/ProfileController';
import { ProfileCreateUseCase } from '../core/useCases/Profile/ProfileCreateUseCase';
import { ProfileGetByIdUseCase } from '../core/useCases/Profile/ProfileGetByIdUseCase';
import { ProfileUpdateUseCase } from '../core/useCases/Profile/ProfileUpdateUseCase';
import { RawgRepostiry } from '../infra/Repositories/Games/RawgRepostiry';
import { ProfileUserRepository } from '../infra/Repositories/prisma/Repositories/ProfileUserRepository';
import { profileValidationZod } from '../infra/Validations/ZodValidations/Profile/profile-validation.zod';

export function makeProfileController() {
    const gamesRepo = new RawgRepostiry();
    const profileRepo = new ProfileUserRepository(gamesRepo);

    const validation = new profileValidationZod();

    const getProfile = new ProfileGetByIdUseCase(profileRepo);
    const createProfiel = new ProfileCreateUseCase(profileRepo);
    const updateProfile = new ProfileUpdateUseCase(profileRepo);

    const getProfileGames = new ProfileController(getProfile, createProfiel, updateProfile, validation);

    return getProfileGames;
}
