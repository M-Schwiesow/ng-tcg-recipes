import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe(1, "perfectly normal stew", "seems legit", "someUrl", [
      new Ingredient(12345, 'perfectly normal beast', 2),
      new Ingredient(736261, 'tomato', 1)
    ]),
    new Recipe(2, "tasty chicken", "dummy recipe 2", "someUrl", [
      new Ingredient(847372, 'green salsa', 1),
      new Ingredient(982763, 'sour cream', 1),
      new Ingredient(123853, 'chicken', 2)
    ])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();  // slice passes a copy, not a reference.  core javascript
  }

  
  getRecipe(id: number): Recipe {
    const recipe: Recipe = this.recipes.find(
      (recipe) => {
        return recipe.id === id;
      }
    );
    return recipe;
  }
}