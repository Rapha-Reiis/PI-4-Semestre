import { Api } from "../api";
import express, { Express } from "express";
import { IRoutes } from "./routes/routes";

export class ApiExpress implements Api {
  private app: Express;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  static create(routes: IRoutes[]) {
    return new ApiExpress(routes);
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server rodando na porta ${port}`);
      this.listRoutes();
    });
  }

  private addRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod(); 
      const handler = route.getHandler();

      (this.app as any)[method](path, handler);
    });
  }

  private listRoutes() {
    const router: any = (this.app as any)._router;

    if (!router || !router.stack) {
      console.log("Nenhuma rota registrada ou _router ainda não existe");
      return;
    }

    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => {
        return {
          path: layer.route.path,
          method: layer.route.stack[0].method.toUpperCase(),
        };
      });

    console.table(routes);
  }
}
