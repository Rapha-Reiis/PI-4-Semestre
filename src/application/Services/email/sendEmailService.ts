import { IEmail } from '../../../adapters/IEmail';
import { ErrorApp } from '../../../core/Error/erro-app';
import { welcomeTemplate } from './templates/welcomeTemplate';

export class SendEmailService {
    constructor(private sendEmail: IEmail) {}

    async sendWelcomeEmail(to: string, name: string) {
        try {
            const user = name.split(' ')[0];
            const template = welcomeTemplate(user!);
            return await this.sendEmail.send(to, 'Bem vinde ao SafeZone', template);
        } catch (err: any) {
            throw new ErrorApp('Erro ao enviar email', 500, err);
        }
    }
}
