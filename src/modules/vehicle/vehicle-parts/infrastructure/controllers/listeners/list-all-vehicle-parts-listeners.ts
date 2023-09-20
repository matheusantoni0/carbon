import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { ListAllVehiclePartsResponse } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/responses/list-all-vehicleParts-response";

export function onSuccess(res: Response): (vehicleParts: VehiclePart[]) => Promise<void> {
  return async (vehicleParts: VehiclePart[]): Promise<void> => {
    res.status(StatusCodes.OK).send(new ListAllVehiclePartsResponse(vehicleParts).toPlain());
  };
}
