
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";
import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { recipeErrors } from "#/modules/meal/recipe/infrastructure/controllers/errors/recipe-errors";
import { GetRecipeByIdResponse } from "#/modules/meal/recipe/infrastructure/controllers/responses/get-recipe-by-id-response";

export function onSuccess(res: Response): (recipe: Recipe) => Promise<void> {
  return async (recipe: Recipe): Promise<void> => {
    res.status(StatusCodes.OK).send(new GetRecipeByIdResponse(recipe).toPlain());
  };
}

export function onNotFound(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(new ApplicationErrorResponse(recipeErrors.itWasNotPossibleToFindTheRecipe).toPlain());
  };
}
