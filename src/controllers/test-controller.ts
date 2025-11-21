import { Request, Response } from 'express';

import { ErrorBadRequest } from '../core/Error/error-bad-request';
import { ErrorApp } from '../core/Error/erro-app';
import { UpgradeUserToPremiumService } from '../application/Services/paymentsServices/UpgradeUserToPremium.service';

export class TesteController {
    constructor(private teste: UpgradeUserToPremiumService) {}

    Stest(req: Request, res: Response) {
        const { userId } = req.body;
        if (!userId) throw new ErrorBadRequest('teste');
        console.log(userId);
        try {
            this.teste.execute(userId);
        } catch (err) {
            throw new ErrorApp('seila', 500, err);
        }

        res.status(200).json({ message: 'Teste' });
    }
}
