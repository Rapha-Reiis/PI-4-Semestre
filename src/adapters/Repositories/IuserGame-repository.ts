import { GameStatus } from '@prisma/client';
import { ProfileCreateDTO, ProfileUpdateDTO } from '../../core/Entities/userGame-entity';

export interface IUserGameRepository {
    getUserProfile(userId: string, page: number, limit: number, status?: GameStatus): Promise<any>;
    createUserProfile(data: ProfileCreateDTO): Promise<any>;
    UpdateDataProfile(data: ProfileUpdateDTO): Promise<any>;
    VerifyGameWithUser(userId: string, rawgId: string): Promise<any>;
    totalGameStatusGame(gameId: number): Promise<any>;
    totalGameStatusUser(userId: string): Promise<any>
}
