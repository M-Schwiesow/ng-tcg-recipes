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
}