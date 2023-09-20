/* eslint-disable max-lines-per-function */

import { injectable } from "inversify";
import { ModelClass } from "objection";

import { Option } from "#/libs/strict-monapt";

import { NutritionalValue } from "#/modules/garage/domain/entities/nutritional-value";
import { NutritionalValueId } from "#/modules/garage/domain/entities/value-objects/nutritional-value-id";
import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";
import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageRepository } from "#/modules/garage/domain/repositories/garage-repository";
import { NutritionalValueModel } from "#/modules/garage/infrastructure/objections/models/nutrition-value-model";
import { GarageModel } from "#/modules/garage/infrastructure/objections/models/garage-model";

@injectable()
export class GarageObjection extends GarageRepository {
  private readonly model: ModelClass<GarageModel> = GarageModel;

  public async insert(entity: Garage): Promise<void> {
    const { nutritionalValue, ...rest } = entity;
    await this.model.transaction(async (trx) => {
      const garage = GarageModel.create({
        ...rest,
        nutritionalValue,
      });

      const createdGarage = await this.model.query(trx).insert(garage);

      const nutritionalValuePayload = NutritionalValueModel.create(
        new NutritionalValue({
          ...nutritionalValue,
          id: Option(new NutritionalValueId()),
          garageId: Option(new GarageId()),
        }),
      );

      await Promise.all([
        createdGarage
          .$relatedQuery<NutritionalValueModel>("nutritionalValue", trx)
          .insert(nutritionalValuePayload),
      ]);
    });
  }

  public async getById(id: GarageId): Promise<Option<Garage>> {
    const garageModel = await this.model.query().findById(id.toString()).withGraphFetched("nutritionalValue");

    return Option(garageModel?.toDomain());
  }

  public async listAll(): Promise<Garage[]> {
    const garageModels = await this.model.query().select().withGraphFetched("nutritionalValue");

    const garages = garageModels.map((garage) => new Garage(garage.toDomain()));

    return garages;
  }
}
/* eslint-enable max-lines-per-function */
