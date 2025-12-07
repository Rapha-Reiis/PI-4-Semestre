import { IUsecase } from "@core/usecases/Usecase";
import { HttpMethod, IRoutes } from "../routes";
import { searchInputDTO, searchOutputDto } from "@core/usecases/user/Search-users.usecase";
import { Request, Response } from "express";

export class SearchUserRoute implements IRoutes {
  private constructor(
    private path: string,
    private method: HttpMethod,
    private searchUserService: IUsecase<searchInputDTO, searchOutputDto>
  ) {}

  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }

  public static create(SearchUC: IUsecase<any, any>) {
    return new SearchUserRoute("/users/search", HttpMethod.GET, SearchUC);
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const { username } = req.query as { username: string };

      const responseBody: searchOutputDto =
        await this.searchUserService.execute({ username });

      res.status(200).json(responseBody);
    };
  }
}
