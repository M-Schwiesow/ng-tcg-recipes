import { AuthService } from './../features/auth/auth.service';
import { RecipeService } from './../features/recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../features/recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

/**
 * Service for saving data from our application.
 * Recommend replacing this once we put together a proper backend service.
 * Remember the pattern for component/service/client?  I think it was something like that.
 */
@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log('response from firebase: ', response);
    });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      });
    }), 
    tap(recipes => {
      this.recipeService.replaceRecipeList(recipes);
    })
    );

    // return this.authService.user.pipe(
    // take(1), // take recieves a single update from it's target observable, then unsubscribes
    // // exhaust map will wait until the current observable resolves, then call the next observable
    // exhaustMap(user => {
    //     return this.http.get<Recipe[]>('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json')
    //   }), 
    //   //the above actions enable us to chain on map/tap to the recipes observable
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       // split the parts of the recipe and return them.  check for an ingredients list, and provide an empty array if list is missing
    //       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    //     });
    //   }), 
    //   tap(recipes => {
    //     this.recipeService.replaceRecipeList(recipes);
    //   })
    // );
  }
}