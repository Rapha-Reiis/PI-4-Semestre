import { GameStatus } from '@prisma/client';
import { RawgGameDetails } from './GameEntity';

export interface userGameEntity {
    id: string;
    userId: string;
    rawgId: string;
    status?: GameStatus;
    rating?: number;
    note?: string;
    review?: string;
}

export type ProfileCreateDTO = {
    id?: string;
    userId: string;
    rawgId: number;
    status: GameStatus;
    rating?: number;
    note?: string;
    review?: string;
};

export type ProfileUpdateDTO = {
    id: string;
    status?: GameStatus;
    rating?: number;
    note?: string;
    review?: string;
};

export type userWithGame = {
    user: userGameEntity;
    game: RawgGameDetails;
};
