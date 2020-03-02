import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("goulash 1", "dummy recipe 1", "someUrl"),
    new Recipe("goulash 2", "dummy recipe 2", "someUrl")

  ];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipe(selectedRecipe: Recipe) {
    this.recipeSelected.emit(selectedRecipe);
  }
}
