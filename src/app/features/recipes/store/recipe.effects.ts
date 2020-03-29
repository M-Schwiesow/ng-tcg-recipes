import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromAppReducer from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromAppReducer.AppState>) {}

  @Effect()
  getRecipes = this.actions$.pipe(
    ofType(RecipesActions.GET_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json')
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
          }),
          map(recipes => new RecipesActions.SetRecipes(recipes))
        );
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put('https://ng-tcg-recipes-mz.firebaseio.com/recipes.json', recipeState.recipes);
    })
  );
}