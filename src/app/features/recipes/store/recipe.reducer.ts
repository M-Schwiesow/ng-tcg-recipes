import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

// TODO : Clean up state for editedRecipe/Index if unnecessary

export interface State {
  recipes: Recipe[];
  editedRecipe: Recipe;
  editedRecipeIndex: number;
}

const initialState: State = {
  recipes: [],
  editedRecipe: null,
  editedRecipeIndex: -1
}
export function recipeReducer(state = initialState, action: RecipesActions.RecipesAction) {
  switch(action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case RecipesActions.UPDATE_RECIPE:
      let targetIndex: number = -1;
      const targetRecipe = state.recipes.find((recipe, index) => {
        if(recipe.id === action.payload.id) {
          targetIndex = index;
          return recipe;
        }
      });
      const editedRecipe = {
        ...targetRecipe,
        ...action.payload
      };
      const updatedRecipes = [...state.recipes];
      if(targetIndex > -1) {
        updatedRecipes[targetIndex] = editedRecipe;
      }
      return {
        ...state,
        recipes: updatedRecipes,
        editedRecipe: null,
        editedRecipeIndex: -1
      }
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id != action.payload),
        editedRecipe: null,
        editedRecipeIndex: -1
      }
    case RecipesActions.START_EDIT:
      return {
        ...state,
        editedRecipeIndex: action.payload,
        editedRecipe: {...state.recipes[action.payload]}
      }
    case RecipesActions.STOP_EDIT:
      return {
        ...state,
        editedRecipe: null,
        editedRecipeIndex: -1
      }
    default:
      return state;
  }
}