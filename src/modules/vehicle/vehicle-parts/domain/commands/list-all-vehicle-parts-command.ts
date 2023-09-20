import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { VehiclePartRepository } from "#/modules/vehicle/vehicle-parts/domain/repositories/vehicle-part-repository";

@injectable()
export class ListAllVehiclePartsCommand {
  public onSuccess: (vehicleParts: VehiclePart[]) => Promise<void> = noop;

  public onRepositoryEmpty: (vehicleParts: VehiclePart[]) => Promise<void> = noop;

  public constructor(@inject(VehiclePartRepository) private readonly vehiclePartRepository: VehiclePartRepository) {}

  public async execute(): Promise<void> {
    const vehicleParts = await this.vehiclePartRepository.listAll();

    if (vehicleParts.length < 1) return this.onRepositoryEmpty([]);

    return this.onSuccess(vehicleParts);
  }
}
