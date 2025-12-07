import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
export class PostgresDbConfig {
  public pool!: Pool;
  public prisma: PrismaClient;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL não foi definida no .env");
    }
    const dataBaseUrl = process.env.DATABASE_URL;

    this.pool = new Pool({
      connectionString: dataBaseUrl,
    });

    const adapter = new PrismaPg(this.pool);
    this.prisma = new PrismaClient({ adapter });
  }

  public async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const result = await this.pool.query(text, params);
    return result.rows as T[];
  }
}
