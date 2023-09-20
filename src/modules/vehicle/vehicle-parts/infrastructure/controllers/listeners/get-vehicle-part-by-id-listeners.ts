import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ApplicationErrorResponse } from "#/modules/@common/infrastructure/application-error-response";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { vehiclePartErrors } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/errors/vehicle-part-errors";
import { GetVehiclePartByIdResponse } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/responses/get-vehiclePart-by-id-response";

export function onSuccess(res: Response): (vehiclePart: VehiclePart) => Promise<void> {
  return async (vehiclePart: VehiclePart): Promise<void> => {
    res.status(StatusCodes.OK).send(new GetVehiclePartByIdResponse(vehiclePart).toPlain());
  };
}

export function onNotFound(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(new ApplicationErrorResponse(vehiclePartErrors.itWasNotPossibleToFindTheVehiclePart).toPlain());
  };
}
