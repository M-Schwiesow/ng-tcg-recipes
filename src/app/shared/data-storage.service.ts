import { RecipeService } from './../features/recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../features/recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

/**
 * Service for saving data from our application.
 * Recommend replacing this once we put together a proper backend service.
 * Remember the pattern for component/service/client?  I think it was something like that.
 */
@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log('response from firebase: ', response);
    });
  }

  fetchRecipes() {
    let fetchedRecipes: Recipe[];
    return this.http.get<Recipe[]>('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          // split the parts of the recipe and return them.  check for an ingredients list, and provide an empty array if list is missing
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }), tap(recipes => {
        this.recipeService.replaceRecipeList(recipes);
      })
      );
    //   .subscribe(recipes => {
    //   console.log(recipes);
    //   fetchedRecipes = recipes;
    //   this.recipeService.replaceRecipeList(fetchedRecipes);
    // });
  }
}