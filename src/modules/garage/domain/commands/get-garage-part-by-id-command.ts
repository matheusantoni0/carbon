import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";
import { GarageRepository } from "#/modules/garage/domain/repositories/garage-repository";

@injectable()
export class GetGarageByIdCommand {
  public onSuccess: (garage: Garage) => Promise<void> = noop;

  public onNotFound: () => Promise<void> = noop;

  public constructor(@inject(GarageRepository) private readonly garageRepository: GarageRepository) {}

  public async execute(id: GarageId): Promise<void> {
    const garageModel = await this.garageRepository.getById(id);

    if (garageModel.isEmpty()) return this.onNotFound();

    const garage = garageModel.get();
    return this.onSuccess(garage);
  }
}
