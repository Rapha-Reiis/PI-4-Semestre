import { PrismaClient } from "../infrastructure/generated/prisma/index.js";

const prisma = new PrismaClient();

export async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}
