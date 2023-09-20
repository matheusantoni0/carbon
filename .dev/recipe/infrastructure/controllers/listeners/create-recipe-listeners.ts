import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";
import { recipeErrors } from "#/modules/meal/recipe/infrastructure/controllers/errors/recipe-errors";

export function onSuccess(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res.status(StatusCodes.OK).send();
  };
}

export function onError(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res
      .status(StatusCodes.FORBIDDEN)
      .send(new ApplicationErrorResponse(recipeErrors.itWasNotPossibleToRegisterTheRecipe).toPlain());
  };
}
