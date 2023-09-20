import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { JsonController, Res, Get, Params } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { SwaggerError } from "#/configs/server/swagger/swagger-error";

import { GetVehiclePartByIdCommand } from "#/modules/vehicle/vehicle-parts/domain/commands/get-vehiclePart-by-id-command";
import { VehiclePartId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-id";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { vehiclePartErrors } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/errors/vehicle-part-errors";
import {
  onNotFound,
  onSuccess,
} from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/listeners/get-vehiclePart-by-id-listeners";
import { GetVehiclePartByIdRequest } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/requests/get-vehiclePart-by-id-request";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class GetVehiclePartByIdController {
  public onSuccess: (res: Response) => (vehiclePart: VehiclePart) => Promise<void> = onSuccess;

  public onNotFound: (res: Response) => () => Promise<void> = onNotFound;

  public constructor(@inject(GetVehiclePartByIdCommand) private readonly command: GetVehiclePartByIdCommand) {}

  @OpenAPI(
    SwaggerError.generate([
      {
        error: vehiclePartErrors.itWasNotPossibleToFindTheVehiclePart,
        statusCode: StatusCodes.NOT_FOUND,
      },
    ]),
  )
  @Get("vehicle-part/:id")
  public async getVehiclePartById(
    @Res() res: Response,
    @Params() request: GetVehiclePartByIdRequest,
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res);
    this.command.onNotFound = this.onNotFound(res);

    const id = new VehiclePartId(request.id);

    await this.command.execute(id);

    return res;
  }
}
