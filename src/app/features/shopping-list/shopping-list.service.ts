import { Ingredient } from './../../shared/ingredient.model';
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addMany(ingredients: Ingredient[]) {
    // ingredients.forEach(ingredient => this.ingredients.push(ingredient));
    // this is a neat little operator '...' that separates our array into something that push can handle (comma separated values)
    this.ingredients.push(...ingredients);     this.ingredientsChanged.emit(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

}