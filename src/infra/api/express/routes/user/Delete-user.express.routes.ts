import { Request, Response } from "express";
import { HttpMethod, IRoutes } from "../routes";
import { IUsecase } from "@core/usecases/Usecase";

export class UserDeleteRoute implements IRoutes {
  private constructor(
    private path: string,
    private method: HttpMethod,
    private DeleteUserUc: IUsecase<any, any>
  ) {}

  public static create(DeleteUC: IUsecase<any, any>) {
    return new UserDeleteRoute("/users/delete", HttpMethod.DELETE, DeleteUC);
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const { userId } = req.query as { userId: string };

      await this.DeleteUserUc.execute({ userId });

      res.status(200).json({ message: "Deletado com sucesso!" });
    };
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }
}
