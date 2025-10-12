import { IProfileValidation } from '../../../../adapters/Validations/IProfileValidation.request';
import { GameStatus, profileCreateSchema } from './pofile-schema';
import { ProfileCreateDTO } from '../../../../core/Entities/Profile';
import { ErrorBadRequest } from '../../../../core/Error/ErrorBadRequest';

export class profileValidationZod implements IProfileValidation {
    create(data: ProfileCreateDTO) {
        const valid = profileCreateSchema.safeParse(data);
        if (!valid.success) {
            const details = valid.error.flatten().fieldErrors;
            throw new ErrorBadRequest('Erro no body', details);
        } else {
            return null;
        }
    }

    verifyEmail(email: string) {
        if (email.includes('@')) {
            return null;
        } else {
            return 'Email no formato incorreto ';
        }
    }

    verifyEnum(status: string): status is GameStatus {
        return Object.values(GameStatus).includes(status as GameStatus);
    }
}
