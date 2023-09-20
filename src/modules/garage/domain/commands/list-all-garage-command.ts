import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageRepository } from "#/modules/garage/domain/repositories/garage-repository";

@injectable()
export class ListAllGaragesCommand {
  public onSuccess: (garages: Garage[]) => Promise<void> = noop;

  public onRepositoryEmpty: (garages: Garage[]) => Promise<void> = noop;

  public constructor(@inject(GarageRepository) private readonly garageRepository: GarageRepository) {}

  public async execute(): Promise<void> {
    const garages = await this.garageRepository.listAll();

    if (garages.length < 1) return this.onRepositoryEmpty([]);

    return this.onSuccess(garages);
  }
}
