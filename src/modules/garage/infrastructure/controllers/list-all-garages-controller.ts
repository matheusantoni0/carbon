import { Response } from "express";
import { inject, injectable } from "inversify";
import { JsonController, Res, Get } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { ListAllGaragesCommand } from "#/modules/garage/domain/commands/list-all-garage-command";
import { Garage } from "#/modules/garage/domain/entities/garage";
import { onSuccess } from "#/modules/garage/infrastructure/controllers/listeners/create-vehicle-part-listeners";

@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@injectable()
@JsonController()
export class ListAllGaragesController {
  public onSuccess: (res: Response) => (garage: Garage[]) => Promise<void> = onSuccess;

  public constructor(@inject(ListAllGaragesCommand) private readonly command: ListAllGaragesCommand) {}

  @Get("garage")
  public async listAllGarages(@Res() res: Response): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res);
    this.command.onRepositoryEmpty = this.onSuccess(res);
    await this.command.execute();

    return res;
  }
}
