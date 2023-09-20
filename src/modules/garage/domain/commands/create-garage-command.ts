import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageRepository } from "#/modules/garage/domain/repositories/garage-repository";

@injectable()
export class CreateGarageCommand {
  public onSuccess: () => Promise<void> = noop;

  public constructor(@inject(GarageRepository) private readonly garageRepository: GarageRepository) {}

  public async execute(garage: Garage): Promise<void> {
    await this.garageRepository.insert(garage);
    return this.onSuccess();
  }
}
