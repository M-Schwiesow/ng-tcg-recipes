import { Subject } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe("perfectly normal stew", "seems legit", "someUrl", [
      new Ingredient(12345, 'perfectly normal beast', 2),
      new Ingredient(736261, 'tomato', 1)
    ]),
    new Recipe("Green Salsa Chicken", "Green salsa chicken with black beans and rice.", "someUrl", [
      new Ingredient(847372, 'green salsa', 1),
      new Ingredient(982763, 'sour cream', 1),
      new Ingredient(123853, 'chicken', 2),
      new Ingredient(Math.random(), 'rice', 2),
      new Ingredient(Math.random(), 'black beans', 1)
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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(editedRecipe: Recipe) {
    const recipeIndex: number = this.recipes.findIndex(
      (recipe) => {
        return recipe.id === editedRecipe.id;
      }
    );
    this.recipes[recipeIndex] = editedRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(deletedRecipe: Recipe) {
    const recipeIndex: number = this.recipes.findIndex(
      (recipe) => {
        return recipe.id === deletedRecipe.id;
      }
    );
    this.recipes.splice(recipeIndex,1);
    this.recipesChanged.next(this.getRecipes());
  }
}