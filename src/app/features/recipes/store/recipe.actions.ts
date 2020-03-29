import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const GET_RECIPES = '[Recipes] Get Recipes';
export const GET_RECIPE = '[Recipes] Get Recipe';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const START_EDIT = '[Recipes] Start Edit';
export const STOP_EDIT = '[Recipes] Stop Edit';
export const STORE_RECIPES = '[Recipes] Store Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class GetRecipes implements Action {
  readonly type = GET_RECIPES;
}

export class GetRecipe implements Action {
  readonly type = GET_RECIPE;
  constructor(public payload: Recipe) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesAction =
  SetRecipes
  | GetRecipes
  | GetRecipe
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StartEdit
  | StopEdit
  | StoreRecipes;