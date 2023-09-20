import { Response } from "express";
import { inject, injectable } from "inversify";
import { JsonController, Res, Get } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { ListAllVehiclePartsCommand } from "#/modules/vehicle/vehicle-parts/domain/commands/list-all-vehicleParts-command";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { onSuccess } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/listeners/list-all-vehicleParts-listeners";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class ListAllVehiclePartsController {
  public onSuccess: (res: Response) => (vehiclePart: VehiclePart[]) => Promise<void> = onSuccess;

  public constructor(@inject(ListAllVehiclePartsCommand) private readonly command: ListAllVehiclePartsCommand) {}

  @Get("vehicle-part")
  public async listAllVehicleParts(@Res() res: Response): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res);
    this.command.onRepositoryEmpty = this.onSuccess(res);
    await this.command.execute();

    return res;
  }
}
