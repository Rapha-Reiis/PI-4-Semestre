import { date, number, string } from 'zod';
import { IReviewRepository } from '../../../adapters/Repositories/Ireview-repository';
import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { ReviewCreateDTO } from '../../Entities/review-entity';
import { ErrorBadRequest } from '../../Error/error-bad-request';
import { ErrorNotFound } from '../../Error/error-not-found';
import { ReviewStatus } from '@prisma/client';
import { DateForStatus } from '../../../util/return-date-for-status';
import { ErrorConflitct } from '../../Error/error-conflict';
import { ErroBusinessRules } from '../../Error/error-business-rules';

export class ReviewCreateUsecase {
    constructor(
        private repository: IReviewRepository,
        private userRepo: IUserRepository,
    ) {}

    async execute(data: ReviewCreateDTO) {
        this.validateData(data);

        await this.checkUser(data.userId);
        await this.checkDuplicateReview(data.userId, data.gameId);

        data.published_at = DateForStatus.execute(data.status);

        if (data.status == 'PUBLISHED') {
            if (data.rating == null || data.rating <= 0) throw new ErroBusinessRules('Não pode ser publicado sem passar a nota');
        }

        const output = await this.repository.create(data);

        return output;
    }

    private validateData(data: ReviewCreateDTO, update?: boolean) {
        const texts: string[] = [];
        if (!update) {
            if (data.userId.length == 0) texts.push('userId não foi passado');
            if (data.gameId == null || undefined) texts.push('GameId não foi passado');
        }
        if (data.title.length == 0) texts.push('Título não pode estar vazio');
        if (data.rating) {
            if (isNaN(Number(data.rating))) throw new ErrorBadRequest('rating não foi passado corretamente');
        }
        if (!['PUBLISHED', 'DRAFT'].includes(data.status)) texts.push('Parâmetro passado para status não é valido');

        const details = texts.map((fields: any) => ({ fields }));
        if (details.length > 0) {
            throw new ErrorBadRequest('Erro na validação dos dados', details);
        }
    }

    private async checkUser(userId: string): Promise<void> {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new ErrorNotFound('Usuário não encontrado/cadastrado');
    }

    private async checkDuplicateReview(userId: string, gameId: number): Promise<void> {
        const exist = await this.repository.verifyDuplicateReview(userId, gameId);
        if (exist) throw new ErrorConflitct(null, 'Review já existe');
    }
}

/* 

Metas:
    validar se os dados estão bem estruturados
    validar se usuário existe
    validar se para não existir duplicata de review
    não pode ser publicado sem nota
    adicionar data no published_at quando status for published
*/
