import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";
import { Garage } from "#/modules/garage/domain/entities/garage";
import { garageErrors } from "#/modules/garage/infrastructure/controllers/errors/garage-errors";
import { GetGarageByIdResponse } from "#/modules/garage/infrastructure/controllers/responses/get-garage-by-id-response";

export function onSuccess(res: Response): (garage: Garage) => Promise<void> {
  return async (garage: Garage): Promise<void> => {
    res.status(StatusCodes.OK).send(new GetGarageByIdResponse(garage).toPlain());
  };
}

export function onNotFound(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(new ApplicationErrorResponse(garageErrors.itWasNotPossibleToFindTheGarage).toPlain());
  };
}
