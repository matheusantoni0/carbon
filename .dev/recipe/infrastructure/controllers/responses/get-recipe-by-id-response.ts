import { instanceToPlain } from "class-transformer";

import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";

export class GetRecipeByIdResponse {
  public constructor(private readonly recipe: Recipe) {}

  public toPlain(): Record<string, unknown> {
    return instanceToPlain<Recipe>({
      id: this.recipe.id,
      name: this.recipe.name,
      recipeIngredients: this.recipe.recipeIngredients,
      portionAmount: this.recipe.portionAmount,
      measurement: this.recipe.measurement,
    });
  }
}
