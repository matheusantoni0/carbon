import { Model, RelationMappings } from "objection";

import { Option } from "#/libs/strict-monapt";
import { Uuid } from "#/libs/uuid";

import { NutritionalValue } from "#/modules/vehicle/vehicle-parts/domain/entities/nutritional-value";
import { NutritionalValueId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/nutritional-value-id";
import { VehiclePartCategory } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-category";
import { VehiclePartId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-id";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { NutritionalValueModel } from "#/modules/vehicle/vehicle-parts/infrastructure/objections/models/nutrition-value-model";

interface IVehiclePartModel {
  id: string;
  name: string;
  category: VehiclePartCategory;
}

export class VehiclePartModel extends Model implements IVehiclePartModel {
  public static tableName = "vehicleParts";

  public static relationMappings = (): RelationMappings => ({
    nutritionalValue: {
      relation: Model.HasOneRelation,
      modelClass: NutritionalValueModel,
      join: {
        from: `${this.tableName}.id`,
        to: `${NutritionalValueModel.tableName}.vehiclePartId`,
      },
    },
  });

  public id!: string;

  public name!: string;

  public category!: VehiclePartCategory;

  public nutritionalValue!: NutritionalValueModel;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static create(entity: VehiclePart): VehiclePartModel {
    const model = new VehiclePartModel();

    model.id = Uuid.new().toString();
    model.name = entity.name;
    model.category = entity.category;

    return model;
  }

  public toDomain(): VehiclePart {
    const id = new VehiclePartId(this.id);
    return new VehiclePart({
      id: Option(id),
      name: this.name,
      category: this.category,
      nutritionalValue: new NutritionalValue({
        ...this.nutritionalValue,
        id: Option(new NutritionalValueId(this.nutritionalValue.id)),
        vehiclePartId: Option(id),
      }),
    });
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  public $beforeInsert(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
