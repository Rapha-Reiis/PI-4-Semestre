import { prisma } from '../infra/Repositories/prisma/client';
import 'dotenv/config';
import App from './App';

const PORT = process.env.PORT || 3000;
const runningMsg: string = `App is listening on port ${PORT}`;

const runServer = async () => {
    try {
        await prisma.$connect();
        App.listen(PORT, () => {
            console.log(runningMsg);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

runServer();
