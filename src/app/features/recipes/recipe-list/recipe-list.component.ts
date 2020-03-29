import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import * as fromAppReducer from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  private recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromAppReducer.AppState>) { }
  
  ngOnInit(): void {
    this.recipeSubscription = this.store.select('recipes').pipe(
      map(recipesState => recipesState.recipes)
    )
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  onSelectRecipe(selectedRecipe: Recipe): void {
    this.recipeService.recipeSelected.emit(selectedRecipe);
  }
}
