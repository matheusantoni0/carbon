import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { VehiclePartId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-id";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { VehiclePartRepository } from "#/modules/vehicle/vehicle-parts/domain/repositories/vehicle-part-repository";

@injectable()
export class GetVehiclePartByIdCommand {
  public onSuccess: (vehiclePart: VehiclePart) => Promise<void> = noop;

  public onNotFound: () => Promise<void> = noop;

  public constructor(@inject(VehiclePartRepository) private readonly vehiclePartRepository: VehiclePartRepository) {}

  public async execute(id: VehiclePartId): Promise<void> {
    const vehiclePartModel = await this.vehiclePartRepository.getById(id);

    if (vehiclePartModel.isEmpty()) return this.onNotFound();

    const vehiclePart = vehiclePartModel.get();
    return this.onSuccess(vehiclePart);
  }
}
