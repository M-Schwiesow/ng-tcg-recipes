import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("goulash", "dummy recipe", "someUrl"),
    new Recipe("goulash", "dummy recipe", "someUrl")

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
