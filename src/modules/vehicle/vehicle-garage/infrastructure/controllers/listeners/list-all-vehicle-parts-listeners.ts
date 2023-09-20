import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { ListAllGaragesResponse } from "#/modules/garage/infrastructure/controllers/responses/list-all-garages-response";

export function onSuccess(res: Response): (garages: Garage[]) => Promise<void> {
  return async (garages: Garage[]): Promise<void> => {
    res.status(StatusCodes.OK).send(new ListAllGaragesResponse(garages).toPlain());
  };
}
