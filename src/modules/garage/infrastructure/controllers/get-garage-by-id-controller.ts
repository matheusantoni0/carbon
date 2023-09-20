import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { JsonController, Res, Get, Params } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { SwaggerError } from "#/configs/server/swagger/swagger-error";

import { GetGarageByIdCommand } from "#/modules/garage/domain/commands/get-garage-part-by-id-command";
import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";
import { garageErrors } from "#/modules/garage/infrastructure/controllers/errors/ingredient-errors";
import { onSuccess } from "#/modules/garage/infrastructure/controllers/listeners/create-vehicle-part-listeners";
import { onNotFound } from "#/modules/garage/infrastructure/controllers/listeners/get-vehicle-part-by-id-listeners";
import { GetGarageByIdRequest } from "#/modules/garage/infrastructure/controllers/requests/get-vehicle-part-by-id-request";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class GetGarageByIdController {
  public onSuccess: (res: Response) => (garage: Garage) => Promise<void> = onSuccess;

  public onNotFound: (res: Response) => () => Promise<void> = onNotFound;

  public constructor(@inject(GetGarageByIdCommand) private readonly command: GetGarageByIdCommand) {}

  @OpenAPI(
    SwaggerError.generate([
      {
        error: garageErrors.itWasNotPossibleToFindTheGarage,
        statusCode: StatusCodes.NOT_FOUND,
      },
    ]),
  )
  @Get("garage/:id")
  public async getGarageById(@Res() res: Response, @Params() request: GetGarageByIdRequest): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res);
    this.command.onNotFound = this.onNotFound(res);

    const id = new GarageId(request.id);

    await this.command.execute(id);

    return res;
  }
}
