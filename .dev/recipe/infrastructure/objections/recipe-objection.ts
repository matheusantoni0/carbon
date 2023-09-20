
import { injectable } from "inversify";
import { ModelClass } from "objection";

import { Option, None } from "#/libs/strict-monapt";

import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { RecipeRepository } from "#/modules/meal/recipe/domain/repositories/recipe-repository";
import { RecipeIngredientModel } from "#/modules/meal/recipe/infrastructure/objections/models/recipe-ingredient-model";
import { RecipeModel } from "#/modules/meal/recipe/infrastructure/objections/models/recipe-model";

@injectable()
export class RecipeObjection extends RecipeRepository {
  private readonly model: ModelClass<RecipeModel> = RecipeModel;

  public async insert(recipe: Recipe): Promise<void> {
    await this.model.transaction(async (trx) => {
      const recipeModel = RecipeModel.create(recipe);

      const createdRecipe = await this.model.query(trx).insert(recipeModel);
      recipe.recipeIngredients.map(async (recipeIngredient) => {
        await createdRecipe
          .$relatedQuery("recipeIngredients", trx)
          .insert(RecipeIngredientModel.create(recipeIngredient));
      });
    });
  }

  public async getById(id: string): Promise<Option<RecipeModel>> {
    const recipeFound = Option(await this.model.query().withGraphFetched("ingredients").findOne({ id }));

    if (recipeFound.isEmpty()) return None();

    const recipeModel = recipeFound.get();
    return Option(recipeModel);
  }
}
