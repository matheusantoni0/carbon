import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";
import { garageErrors } from "#/modules/garage/infrastructure/controllers/errors/garage-errors";

export function onSuccess(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res.status(StatusCodes.OK).send();
  };
}

export function onError(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(new ApplicationErrorResponse(garageErrors.itWasNotPossibleToFindTheGarage).toPlain());
  };
}
