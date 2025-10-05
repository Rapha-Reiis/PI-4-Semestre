import { GameStatus } from '@prisma/client';
import { RawgGameDetails } from './GameEntity';

export interface userGameEntity {
    id: string;
    userId: string;
    rawgId: string;
    status?: GameStatus;
    note?: string;
}

export type ProfileCreateDTO = {
    userId: string;
    rawgId: string;
    status: GameStatus;
    note: string | null;
};

export type ProfileUpdateDTO = {
    id: string;
    status: GameStatus;
    note: string | null;
};

export type userWithGame = {
    user: userGameEntity;
    game: RawgGameDetails;
};
