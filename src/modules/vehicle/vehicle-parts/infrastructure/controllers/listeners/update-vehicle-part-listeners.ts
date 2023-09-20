import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";
import { vehiclePartErrors } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/errors/vehicle-part-errors";

export function onSuccess(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res.status(StatusCodes.OK).send();
  };
}

export function onError(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(new ApplicationErrorResponse(vehiclePartErrors.itWasNotPossibleToFindTheVehiclePart).toPlain());
  };
}
