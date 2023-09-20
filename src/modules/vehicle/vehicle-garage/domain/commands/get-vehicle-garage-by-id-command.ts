import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { VehicleGarageId } from "#/modules/vehicle/vehicle-garage/domain/entities/value-objects/vehicle-garage-id";
import { VehicleGarage } from "#/modules/vehicle/vehicle-garage/domain/entities/vehicle-garage";
import { VehicleGarageRepository } from "#/modules/vehicle/vehicle-garage/domain/repositories/vehicle-garage-repository";

@injectable()
export class GetVehicleGarageByIdCommand {
  public onSuccess: (vehicleGarage: VehicleGarage) => Promise<void> = noop;

  public onNotFound: () => Promise<void> = noop;

  public constructor(
    @inject(VehicleGarageRepository) private readonly vehicleGarageRepository: VehicleGarageRepository,
  ) {}

  public async execute(id: VehicleGarageId): Promise<void> {
    const vehicleGarageModel = await this.vehicleGarageRepository.getById(id);

    if (vehicleGarageModel.isEmpty()) return this.onNotFound();

    const vehicleGarage = vehicleGarageModel.get();
    return this.onSuccess(vehicleGarage);
  }
}
