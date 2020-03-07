import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe(1, "perfectly normal stew", "seems legit", "someUrl", [
      new Ingredient('perfectly normal beast', 2),
      new Ingredient('tomato', 1)
    ]),
    new Recipe(2, "tasty chicken", "dummy recipe 2", "someUrl", [
      new Ingredient('green salsa', 1),
      new Ingredient('sour cream', 1),
      new Ingredient('chicken', 2)
    ])
  ]

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