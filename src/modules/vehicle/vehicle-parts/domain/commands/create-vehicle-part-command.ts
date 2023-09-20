import { injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { VehiclePartRepository } from "#/modules/vehicle/vehicle-parts/domain/repositories/vehicle-part-repository";

@injectable()
export class CreateVehiclePartCommand {
  public onSuccess: () => Promise<void> = noop;

  public constructor(@inject(VehiclePartRepository) private readonly vehiclePartRepository: VehiclePartRepository) {}

  public async execute(vehiclePart: VehiclePart): Promise<void> {
    await this.vehiclePartRepository.insert(vehiclePart);
    return this.onSuccess();
  }
}
