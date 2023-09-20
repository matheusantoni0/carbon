
import { Model, RelationMappings } from "objection";

import { Uuid } from "#/libs/uuid";

import { Measurement } from "#/modules/@common/domain/entities/measurement";
import { IngredientModel } from "#/modules/meal/ingredient/infrastructure/objections/models/ingredient-model";
import { RecipeIngredient } from "#/modules/meal/recipe/domain/entities/recipe-ingredient";
import { Cut } from "#/modules/meal/recipe/domain/entities/value-objects/cut";
import { CutSize } from "#/modules/meal/recipe/domain/entities/value-objects/cut-size";
import { RecipeModel } from "#/modules/meal/recipe/infrastructure/objections/models/recipe-model";

interface IRecipeIngredientModel {
  id: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  measurement: Measurement;
  cut: Cut;
  cutSize: CutSize;
}

export class RecipeIngredientModel extends Model implements IRecipeIngredientModel {
  public static tableName = "recipe_ingredients";

  public static relationMappings = (): RelationMappings => ({
    ingredient: {
      relation: Model.HasOneRelation,
      modelClass: IngredientModel,
      join: {
        from: `${IngredientModel.tableName}.id`,
        to: `${this.tableName}.ingredientId`,
      },
    },
    recipe: {
      relation: Model.HasOneRelation,
      modelClass: RecipeModel,
      join: {
        from: `${RecipeModel.tableName}.id`,
        to: `${this.tableName}.recipeId`,
      },
    },
  });

  public id!: string;

  public recipeId!: string;

  public recipe!: RecipeModel;

  public ingredientId!: string;

  public ingredient!: IngredientModel;

  public amount!: number;

  public measurement!: Measurement;

  public cut!: Cut;

  public cutSize!: CutSize;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static create(entity: RecipeIngredient): RecipeIngredientModel {
    const model = new RecipeIngredientModel();
    const recipeIngredient = this.recipeIngredientBuilder(entity);

    Object.assign(model, recipeIngredient);

    return model;
  }

  private static recipeIngredientBuilder(recipeIngredient: RecipeIngredient): IRecipeIngredientModel {
    return {
      id: Uuid.new().toString(),
      recipeId: recipeIngredient.recipe.id.getOrThrow().toString(),
      ingredientId: recipeIngredient.ingredient.id.getOrThrow().toString(),
      amount: recipeIngredient.amount,
      measurement: recipeIngredient.measurement,
      cut: recipeIngredient.cut,
      cutSize: recipeIngredient.cutSize,
    };
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  public $beforeInsert(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
