import { Model, RelationMappings } from "objection";

import { Option } from "#/libs/strict-monapt";
import { Uuid } from "#/libs/uuid";

import { NutritionalValue } from "#/modules/garage/domain/entities/nutritional-value";
import { NutritionalValueId } from "#/modules/garage/domain/entities/value-objects/nutritional-value-id";
import { GarageCategory } from "#/modules/garage/domain/entities/value-objects/garage-category";
import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";
import { Garage } from "#/modules/garage/domain/entities/garage";
import { NutritionalValueModel } from "#/modules/garage/infrastructure/objections/models/nutrition-value-model";

interface IGarageModel {
  id: string;
  name: string;
  category: GarageCategory;
}

export class GarageModel extends Model implements IGarageModel {
  public static tableName = "garages";

  public static relationMappings = (): RelationMappings => ({
    nutritionalValue: {
      relation: Model.HasOneRelation,
      modelClass: NutritionalValueModel,
      join: {
        from: `${this.tableName}.id`,
        to: `${NutritionalValueModel.tableName}.garageId`,
      },
    },
  });

  public id!: string;

  public name!: string;

  public category!: GarageCategory;

  public nutritionalValue!: NutritionalValueModel;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static create(entity: Garage): GarageModel {
    const model = new GarageModel();

    model.id = Uuid.new().toString();
    model.name = entity.name;
    model.category = entity.category;

    return model;
  }

  public toDomain(): Garage {
    const id = new GarageId(this.id);
    return new Garage({
      id: Option(id),
      name: this.name,
      category: this.category,
      nutritionalValue: new NutritionalValue({
        ...this.nutritionalValue,
        id: Option(new NutritionalValueId(this.nutritionalValue.id)),
        garageId: Option(id),
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
