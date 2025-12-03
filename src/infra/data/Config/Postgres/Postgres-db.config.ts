import { Pool } from "pg";
export class PostgresDbConfig {
  private pool!: Pool;
  private databaseUrl: string;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL não foi definida no .env");
    }
    this.databaseUrl = process.env.DATABASE_URL;
    this.poolConnection();
  }

  private poolConnection() {
    this.pool = new Pool({
      connectionString: this.databaseUrl,
    });
  }

  public async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const result = await this.pool.query(text, params);
    return result.rows as T[];
  }
}
