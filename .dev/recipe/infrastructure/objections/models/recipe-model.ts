
import { Model, RelationMappings } from "objection";

import { Option } from "#/libs/strict-monapt";
import { Uuid } from "#/libs/uuid";

import { Measurement } from "#/modules/@common/domain/entities/measurement";
import { Ingredient } from "#/modules/meal/ingredient/domain/entities/ingredient";
import { NutritionalValue } from "#/modules/meal/ingredient/domain/entities/nutritional-value";
import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { RecipeIngredient } from "#/modules/meal/recipe/domain/entities/recipe-ingredient";
import { RecipeIngredientModel } from "#/modules/meal/recipe/infrastructure/objections/models/recipe-ingredient-model";

interface IRecipeModel {
  id: string;
  name: string;
  recipeIngredients: RecipeIngredientModel[];
  amount: number;
  measurement: Measurement;
}

export class RecipeModel extends Model implements IRecipeModel {
  public static tableName = "recipes";

  public static relationMappings = (): RelationMappings => ({
    recipeIngredients: {
      relation: Model.HasOneThroughRelation,
      modelClass: RecipeIngredientModel,
      join: {
        from: `${this.tableName}.id`,
        through: {
          from: `${RecipeIngredientModel.tableName}.recipeId`,
          to: `${RecipeIngredientModel.tableName}.ingredientId`,
        },
        to: `${RecipeIngredientModel.tableName}.id`,
      },
    },
  });

  public id!: string;

  public name!: string;

  public recipeIngredients!: RecipeIngredientModel[];

  public amount!: number;

  public measurement!: Measurement;

  public createdAt!: Date;

  public updatedAt!: Date;

  public static create(entity: Recipe): RecipeModel {
    const model = new RecipeModel();
    const recipe = this.recipeBuilder(entity);

    Object.assign(model, recipe);

    return model;
  }

  private static recipeBuilder(entity: Recipe): IRecipeModel {
    return {
      id: Uuid.new().toString(),
      name: entity.name,
      recipeIngredients: entity.recipeIngredients.map((recipeIngredient) => {
        const ingredient = new RecipeIngredientModel();
        Object.assign(ingredient, recipeIngredient);
        return ingredient;
      }),
      amount: entity.portionAmount,
      measurement: entity.measurement,
    };
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  public $beforeInsert(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // eslint-disable-next-line max-lines-per-function
  public toDomain(): Recipe {
    return new Recipe({
      id: Option(new Uuid(this.id)),
      name: this.name,
      recipeIngredients: this.recipeIngredients.map(
        (recipeIngredient) =>
          new RecipeIngredient({
            id: Option(new Uuid(recipeIngredient.id)),
            ingredient:
              new Ingredient({
                ...recipeIngredient.ingredient,
                id: Option(new Uuid(recipeIngredient.ingredient.id)),
                nutritionalValue: new NutritionalValue({
                  ...recipeIngredient.ingredient.nutritionalValue,
                  id: Option(new Uuid(recipeIngredient.ingredient.nutritionalValue.id)),
                  ingredientId: Option(new Uuid(recipeIngredient.ingredient.nutritionalValue.ingredientId)),
                }),
              }),
            amount: recipeIngredient.amount,
            measurement: recipeIngredient.measurement,
            cut: recipeIngredient.cut,
            cutSize: recipeIngredient.cutSize,
          }),
      ),
      portionAmount: this.amount,
      measurement: this.measurement,
    });
  }
}
