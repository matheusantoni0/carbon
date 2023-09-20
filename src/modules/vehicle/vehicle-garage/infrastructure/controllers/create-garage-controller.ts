import { Response } from "express";
import { inject, injectable } from "inversify";
import { Body, JsonController, Res, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { CreateGarageCommand } from "#/modules/garage/domain/commands/create-garage-command";
import { onSuccess } from "#/modules/garage/infrastructure/controllers/listeners/create-garage-listeners";
import { CreateGarageRequest } from "#/modules/garage/infrastructure/controllers/requests/create-garage-request";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class CreateGarageController {
  public constructor(@inject(CreateGarageCommand) private readonly command: CreateGarageCommand) {}

  @Post("vehicle/vehicle-garage")
  public async createGarage(@Res() res: Response, @Body() body: CreateGarageRequest): Promise<Response> {
    this.command.onSuccess = onSuccess(res);

    const garage = body.toDomain();

    await this.command.execute(garage);

    return res;
  }
}
