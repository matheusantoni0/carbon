import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { VehicleGarage } from "#/modules/vehicle/vehicle-garage/domain/entities/vehicle-garage";
import { VehicleGarageRepository } from "#/modules/vehicle/vehicle-garage/domain/repositories/vehicle-garage-repository";

@injectable()
export class CreateVehicleGarageCommand {
  public onSuccess: () => Promise<void> = noop;

  public constructor(
    @inject(VehicleGarageRepository) private readonly vehicleGarageRepository: VehicleGarageRepository,
  ) {}

  public async execute(vehicleGarage: VehicleGarage): Promise<void> {
    await this.vehicleGarageRepository.insert(vehicleGarage);
    return this.onSuccess();
  }
}
