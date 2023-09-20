import { Response } from "express";
import { inject, injectable } from "inversify";
import { Body, JsonController, Res, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { CreateVehiclePartCommand } from "#/modules/vehicle/vehicle-parts/domain/commands/create-vehiclePart-command";
import { onSuccess } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/listeners/create-vehiclePart-listeners";
import { CreateVehiclePartRequest } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/requests/create-vehiclePart-request";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class CreateVehiclePartController {
  public constructor(@inject(CreateVehiclePartCommand) private readonly command: CreateVehiclePartCommand) {}

  @Post("vehicle-part")
  public async createVehiclePart(@Res() res: Response, @Body() body: CreateVehiclePartRequest): Promise<Response> {
    this.command.onSuccess = onSuccess(res);

    const vehiclePart = body.toDomain();

    await this.command.execute(vehiclePart);

    return res;
  }
}
