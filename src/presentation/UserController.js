import { PrismaClient } from "../infrastructure/generated/prisma/index.js";

const prisma = new PrismaClient();

class UserController {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUsers(req, res) {
        try {
        } catch (err) {
            console.err("Erro ao buscar usuários", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
        const user = await prisma.user.findMany();
        return res.status(200).json(user);
    }
}

export default new UserController();
