
import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";
import { Uuid } from "#/libs/uuid";

import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { RecipeRepository } from "#/modules/meal/recipe/domain/repositories/recipe-repository";

@injectable()
export class GetRecipeByIdCommand {
  public onSuccess: (recipe: Recipe) => Promise<void> = noop;

  public onNotFound: () => Promise<void> = noop;

  public constructor(@inject(RecipeRepository) private readonly recipeRepository: RecipeRepository) {}

  public async execute(id: Uuid): Promise<void> {
    const recipeModel = await this.recipeRepository.getById(id.toString());
    if (recipeModel.isEmpty()) {
      return this.onNotFound();
    }

    const recipe = recipeModel.get().toDomain();
    return this.onSuccess(recipe);
  }
}
