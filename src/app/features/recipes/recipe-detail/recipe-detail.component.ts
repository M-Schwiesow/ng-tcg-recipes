import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';
import * as RecipesActions from './../store/recipe.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromAppReducer.AppState>, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => +params.get('id')),
      switchMap(id => {
        this.recipeId = id;
        return this.store.select('recipes');
      }),
      map(recipeState => recipeState.recipes.find(recipe => recipe.id === this.recipeId))
      ).subscribe(recipe => {
        console.log('recipe found: ', recipe);
        this.recipe = recipe;
      });
   }

  sendToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipe.id));
    this.router.navigate(['../']);
  }

}
