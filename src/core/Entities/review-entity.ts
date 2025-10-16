import { ReviewStatus } from '@prisma/client';

export const createBodyMandatory = ['userId', 'gameId', 'title', 'body', 'status'];
export const updateBody = ['userId', 'gameId', 'title', 'body', 'status', 'rating'];

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
    title?: string;
    body?: string;
    rating?: number;
    status?: ReviewStatus;
    isPublic?: boolean;
    published_at?: Date | null;
};

export type reviewListParams = {
    gameId: number;
    page: number;
    limit: number;
    random: boolean;
};
