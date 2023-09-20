import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { VehicleGarage } from "#/modules/vehicle/vehicle-garage/domain/entities/vehicle-garage";
import { VehicleGarageRepository } from "#/modules/vehicle/vehicle-garage/domain/repositories/vehicle-garage-repository";

@injectable()
export class ListAllVehicleGaragesCommand {
  public onSuccess: (vehicleGarages: VehicleGarage[]) => Promise<void> = noop;

  public onRepositoryEmpty: (vehicleGarages: VehicleGarage[]) => Promise<void> = noop;

  public constructor(
    @inject(VehicleGarageRepository) private readonly vehicleGarageRepository: VehicleGarageRepository,
  ) {}

  public async execute(): Promise<void> {
    const vehicleGarages = await this.vehicleGarageRepository.listAll();

    if (vehicleGarages.length < 1) return this.onRepositoryEmpty([]);

    return this.onSuccess(vehicleGarages);
  }
}
