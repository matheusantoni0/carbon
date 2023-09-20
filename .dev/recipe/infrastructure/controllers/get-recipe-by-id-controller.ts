import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { JsonController, Res, Get, Params } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { SwaggerError } from "#/configs/server/swagger/swagger-error";

import { Uuid } from "#/libs/uuid";

import { GetRecipeByIdCommand } from "#/modules/meal/recipe/domain/commands/get-recipe-by-id-command";
import { recipeErrors } from "#/modules/meal/recipe/infrastructure/controllers/errors/recipe-errors";
import {
  onNotFound,
  onSuccess,
} from "#/modules/meal/recipe/infrastructure/controllers/listeners/get-recipe-by-id-listeners";
import { GetRecipeByIdRequest } from "#/modules/meal/recipe/infrastructure/controllers/requests/get-recipe-by-id-request";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class GetRecipeByIdController {
  public constructor(@inject(GetRecipeByIdCommand) private readonly command: GetRecipeByIdCommand) {}

  @OpenAPI(
    SwaggerError.generate([
      {
        error: recipeErrors.itWasNotPossibleToFindTheRecipe,
        statusCode: StatusCodes.NOT_FOUND,
      },
    ]),
  )
  @Get("meal/recipe/:id")
  public async getRecipeById(@Res() res: Response, @Params() request: GetRecipeByIdRequest): Promise<Response> {
    this.command.onSuccess = onSuccess(res);
    this.command.onNotFound = onNotFound(res);

    await this.command.execute(new Uuid(request.id));

    return res;
  }
}
