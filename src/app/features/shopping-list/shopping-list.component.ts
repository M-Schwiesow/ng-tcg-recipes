import { Ingredient } from './../../shared/ingredient.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent {
  
  ingredients: Ingredient[] = [
    new Ingredient('tomatoes', 3),
    new Ingredient('ground beef', 2)
  ];
  
  constructor() { }

  addItem(item: Ingredient) {
    console.log(item);
    this.ingredients.push(item);
    console.log(this.ingredients);
  }
}