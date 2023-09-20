import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { Body, JsonController, Res, Post, HttpCode } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { SwaggerError } from "#/configs/server/swagger/swagger-error";

import { CreateRecipeCommand } from "#/modules/meal/recipe/domain/commands/create-recipe-command";
import { recipeErrors } from "#/modules/meal/recipe/infrastructure/controllers/errors/recipe-errors";
import { onError, onSuccess } from "#/modules/meal/recipe/infrastructure/controllers/listeners/create-recipe-listeners";
import { CreateRecipeRequest } from "#/modules/meal/recipe/infrastructure/controllers/requests/create-recipe-request";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class CreateRecipeController {
  public constructor(@inject(CreateRecipeCommand) private readonly command: CreateRecipeCommand) {}

  @OpenAPI(
    SwaggerError.generate([
      {
        error: recipeErrors.itWasNotPossibleToRegisterTheRecipe,
        statusCode: StatusCodes.NOT_FOUND,
      },
    ]),
  )
  @HttpCode(StatusCodes.CREATED)
  @Post("meal/recipe")
  public async createRecipe(@Res() res: Response, @Body() body: CreateRecipeRequest): Promise<Response> {
    this.command.onSuccess = onSuccess(res);
    this.command.onError = onError(res);

    await this.command.execute(body.toDomain());

    return res;
  }
}
