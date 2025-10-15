import { IReviewRepository } from '../../../adapters/Repositories/Ireview-repository';
import { IUserRepository } from '../../../adapters/Repositories/Iuser-repository';
import { ReviewCreateDTO } from '../../Entities/review-entity';
import { ErrorNotFound } from '../../Error/error-not-found';
import { DateForStatus } from '../../../util/return-date-for-status';
import { ErrorConflitct } from '../../Error/error-conflict';
import { ErroBusinessRules } from '../../Error/error-business-rules';
import { ValidateReview } from '../../../infra/Validations/customValidate/validate-review';

export class ReviewCreateUsecase {
    constructor(
        private repository: IReviewRepository,
        private userRepo: IUserRepository,
    ) {}

    async execute(data: ReviewCreateDTO) {
        ValidateReview.validateCreate(data);

        await this.checkUser(data.userId);
        await this.checkDuplicateReview(data.userId, data.gameId);

        data.published_at = DateForStatus.execute(data.status);

        if (data.status == 'PUBLISHED') {
            if (data.rating == null || data.rating <= 0) throw new ErroBusinessRules('Não pode ser publicado sem passar a nota');
        }

        const output = await this.repository.create(data);

        return output;
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
