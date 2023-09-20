/* eslint-disable max-lines-per-function */

import { injectable } from "inversify";
import { ModelClass } from "objection";

import { Option } from "#/libs/strict-monapt";

import { NutritionalValue } from "#/modules/vehicle/vehicle-parts/domain/entities/nutritional-value";
import { NutritionalValueId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/nutritional-value-id";
import { VehiclePartId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-id";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { VehiclePartRepository } from "#/modules/vehicle/vehicle-parts/domain/repositories/vehicle-part-repository";
import { NutritionalValueModel } from "#/modules/vehicle/vehicle-parts/infrastructure/objections/models/nutrition-value-model";
import { VehiclePartModel } from "#/modules/vehicle/vehicle-parts/infrastructure/objections/models/vehicle-part-model";

@injectable()
export class VehiclePartObjection extends VehiclePartRepository {
  private readonly model: ModelClass<VehiclePartModel> = VehiclePartModel;

  public async insert(entity: VehiclePart): Promise<void> {
    const { nutritionalValue, ...rest } = entity;
    await this.model.transaction(async (trx) => {
      const vehiclePart = VehiclePartModel.create({
        ...rest,
        nutritionalValue,
      });

      const createdVehiclePart = await this.model.query(trx).insert(vehiclePart);

      const nutritionalValuePayload = NutritionalValueModel.create(
        new NutritionalValue({
          ...nutritionalValue,
          id: Option(new NutritionalValueId()),
          vehiclePartId: Option(new VehiclePartId()),
        }),
      );

      await Promise.all([
        createdVehiclePart
          .$relatedQuery<NutritionalValueModel>("nutritionalValue", trx)
          .insert(nutritionalValuePayload),
      ]);
    });
  }

  public async getById(id: VehiclePartId): Promise<Option<VehiclePart>> {
    const vehiclePartModel = await this.model.query().findById(id.toString()).withGraphFetched("nutritionalValue");

    return Option(vehiclePartModel?.toDomain());
  }

  public async listAll(): Promise<VehiclePart[]> {
    const vehiclePartModels = await this.model.query().select().withGraphFetched("nutritionalValue");

    const vehicleParts = vehiclePartModels.map((vehiclePart) => new VehiclePart(vehiclePart.toDomain()));

    return vehicleParts;
  }
}
/* eslint-enable max-lines-per-function */
