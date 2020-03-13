import { Ingredient } from './../../shared/ingredient.model';
import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addMany(ingredients: Ingredient[]) {
    // ingredients.forEach(ingredient => this.ingredients.push(ingredient));
    // this is a neat little operator '...' that separates our array into something that push can handle (comma separated values)
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  editIngredient(editedIngredient: Ingredient) {
    const ingredientIndex: number = this.ingredients.findIndex(
      (ingredient) => {
        return ingredient.id === editedIngredient.id;
      }
    );
    this.ingredients[ingredientIndex] = editedIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice()); //why does this work without emitting?
  }

  removeIngredient(removedIngredient: Ingredient) {
    const deleteIndex: number = this.ingredients.findIndex(
      (ingredient) => {
        return ingredient.id === removedIngredient.id;
      }
    );
    this.ingredients.splice(deleteIndex,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}