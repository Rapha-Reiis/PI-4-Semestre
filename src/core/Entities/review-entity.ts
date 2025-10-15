import { ReviewStatus } from '@prisma/client';

export const createBodyMandatory = ['userId', 'gameId', 'title', 'body', 'status'];

export type ReviewCreateDTO = {
    userId: string;
    gameId: number;
    title: string;
    body: string | null;
    rating: number | null;
    status: ReviewStatus;
    isPublic?: boolean;
    published_at?: Date | null;
};

export type ReviewUpdateDTO = {
    id: string;
    title: string | null;
    body: string | null;
    rating: number | null;
    status: ReviewStatus | null;
    isPublic: boolean;
    published_at: Date | null;
};
