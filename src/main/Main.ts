import { UserCreateUsecase } from "../core/usecases/user/User-create.usecase";
import { ApiExpress } from "../infra/api/express/api.express";
import { CreateUserRoute } from "infra/api/express/routes/user/Create-user.express.routes";
import { PostgresDbConfig } from "infra/data/Config/Postgres/Postgres-db.config";
import { UserSqlRepository } from "infra/data/repositories/sql/user/User-sql.repository";
import "dotenv/config";
import { UserPrismaRepository } from "infra/data/repositories/prisma/user/User-prisma.repository";

function main() {
  const db = new PostgresDbConfig();

  const userSqlRepo = new UserSqlRepository(db);
  const userPrismaRepo = new UserPrismaRepository(db.prisma);

  const UserCreateUC = new UserCreateUsecase(userPrismaRepo);

  const UserCreateRoute = CreateUserRoute.create(UserCreateUC);

  const port = 3000;

  const api = ApiExpress.create([UserCreateRoute]);

  api.start(port);
}

main();
