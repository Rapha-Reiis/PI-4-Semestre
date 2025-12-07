import { Request, Response } from "express";
import { HttpMethod, IRoutes } from "../routes";
import { IUsecase } from "@core/usecases/Usecase";
import {
  getUserByIdInput,
  getUserByIdOutput,
} from "@core/usecases/user/Get-user-by-id.usecase";

export class UserByIdRoute implements IRoutes {
  private constructor(
    private path: string,
    private method: HttpMethod,
    private getByIdService: IUsecase<getUserByIdInput, getUserByIdOutput>
  ) {}

  public static create(getUserIdUC: IUsecase<any, any>) {
    return new UserByIdRoute("/users", HttpMethod.GET, getUserIdUC);
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const { userId } = req.query as { userId: string };

      const responseBody: getUserByIdOutput = await this.getByIdService.execute(
        { userId }
      );

      res.status(200).json(responseBody);
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
