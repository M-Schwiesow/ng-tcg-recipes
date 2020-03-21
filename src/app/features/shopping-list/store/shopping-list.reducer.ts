import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient(1, 'apples', 2)
  ]
};
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      
      return {
        ...state, // copies old state
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}