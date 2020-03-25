import * as fromShoppingList from './../../shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.recipe = this.recipeService.getRecipe(+params.get('id'));
      }
    )
   }

  sendToShoppingList() {
    // this.shoppingListService.addMany(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['../']);
  }

}
