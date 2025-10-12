import z from 'zod';

export enum GameStatus {
    BACKLOG = 'BACKLOG',
    PLAYING = 'PLAYING',
    FINISHED = 'FINISHED',
    DROPPED = 'DROPPED',
}

const msgStatusError = 'Erro no status(BACKLOG, PLAYING, FINISHED, DROPPED)';

export const profileCreateSchema = z.object({
    userId: z.string('Não foi passado o userId no body'),
    gameId: z.number('Não foi passado o gameId'),
    status: z.enum(GameStatus, {
        error: msgStatusError,
    }),
    note: z.string('Não foi passado o gameId no body').optional(),
});

export const profileValidEnum = z.object({
    status: z
        .enum(GameStatus, {
            error: msgStatusError,
        })
        .optional(),
});
