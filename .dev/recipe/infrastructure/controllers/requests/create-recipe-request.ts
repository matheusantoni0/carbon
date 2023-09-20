
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";

import { None } from "#/libs/strict-monapt";

import { Measurement } from "#/modules/@common/domain/entities/measurement";
import { Ingredient } from "#/modules/meal/ingredient/domain/entities/ingredient";
import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { RecipeIngredient } from "#/modules/meal/recipe/domain/entities/recipe-ingredient";
import { CreateRecipeIngredientRequest } from "#/modules/meal/recipe/infrastructure/controllers/requests/create-recipe-ingredient-request";

export class CreateRecipeRequest {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @Validate(CreateRecipeIngredientRequest)
  @Type(() => CreateRecipeIngredientRequest)
  public ingredients!: CreateRecipeIngredientRequest[];

  @IsNotEmpty()
  @IsNumber()
  public portionAmount!: number;

  @IsNotEmpty()
  @IsEnum(Measurement)
  public measurement!: Measurement;

  public toDomain(): Recipe {
    return new Recipe({
      id: None(),
      name: this.name,
      recipeIngredients: this.ingredients.map(
        (recipeIngredient) =>
          new RecipeIngredient({ ...recipeIngredient, id: None(),
            ingredient: new Ingredient(recipeIngredient.ingredientId) })
      ),
      portionAmount: this.portionAmount,
      measurement: this.measurement,
    });
  }
}
