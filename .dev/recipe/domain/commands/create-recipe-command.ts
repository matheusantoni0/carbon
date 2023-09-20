
import { inject, injectable } from "inversify";

import { noop } from "#/libs/typescript/noop";

import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { RecipeRepository } from "#/modules/meal/recipe/domain/repositories/recipe-repository";

@injectable()
export class CreateRecipeCommand {
  public onSuccess: () => Promise<void> = noop;

  public onError: () => Promise<void> = noop;

  public constructor(@inject(RecipeRepository) private readonly recipeRepository: RecipeRepository) {}

  public async execute(recipe: Recipe): Promise<void> {
    await this.recipeRepository.insert(recipe);

    return this.onSuccess();
  }
}
