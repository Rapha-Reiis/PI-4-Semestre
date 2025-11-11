import { Request, Response } from 'express';
import { CreatePayment } from '../core/useCases/payment/payment-create-code.usecase';
import { ErrorBadRequest } from '../core/Error/error-bad-request';
import { webhookUsecase } from '../core/useCases/payment/webhook.usecase';
import { string } from 'zod';

export class PaymentController {
    constructor(
        private createQRcodeUsecase: CreatePayment,
        private webHookUsecase: webhookUsecase,
    ) {}

    createSubscription = async (req: Request, res: Response) => {
        const { email, userId, type } = req.body;
        if (!email || !userId || !type) throw new ErrorBadRequest('Verificar o request enviado');
        const out = await this.createQRcodeUsecase.execute(email, userId, type);

        return res.status(200).json(out);
    };

    webHook = async (req: Request, res: Response) => {
        const { type, action, data } = req.body;
        const out = await this.webHookUsecase.execute(type, action, data);

        return res.status(200).json(out);
    };
}
