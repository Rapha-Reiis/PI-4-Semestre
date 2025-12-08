import { ApiExpress } from "../infra/api/express/api.express";
import { PostgresDbConfig } from "infra/data/Config/Postgres/Postgres-db.config";
import { UserSqlRepository } from "infra/data/repositories/sql/user/User-sql.repository";
import { UserPrismaRepository } from "infra/data/repositories/prisma/user/User-prisma.repository";
import { VerifyUserExistById } from "services/VerifyUserExist";
import { UserRoutesFactory } from "@factories/UserRouteFactory";

function main() {
  const db = new PostgresDbConfig();

  const userSqlRepo = new UserSqlRepository(db);
  const userPrismaRepo = new UserPrismaRepository(db.prisma);

  const VerifyUserExist = new VerifyUserExistById(userPrismaRepo);

  const factoryUser = new UserRoutesFactory(userPrismaRepo, VerifyUserExist);
  const userRoutes = factoryUser.GetRoutes();

  const Routes = [...userRoutes];

  const port = 3000;

  const api = ApiExpress.create(Routes);

  api.start(port);
}

main();
