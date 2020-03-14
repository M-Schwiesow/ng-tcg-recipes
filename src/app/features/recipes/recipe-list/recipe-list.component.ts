import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  private recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    // consider changing to a subscription, or see if routing from recipe-edit is effective
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  onSelectRecipe(selectedRecipe: Recipe): void {
    this.recipeService.recipeSelected.emit(selectedRecipe);
  }
}
