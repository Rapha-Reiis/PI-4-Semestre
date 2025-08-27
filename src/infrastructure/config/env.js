import "dotenv/config";

function required(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Não foi passo a varaivel da env: ${key}`);
    }
    return;
}

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 3000),
};
