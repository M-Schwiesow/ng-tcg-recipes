import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const id: number = +params.get('id');
        this.recipe = this.recipeService.getRecipe(id);
      }
    )
   }

  sendToShoppingList() {
    this.shoppingListService.addMany(this.recipe.ingredients);
  }

}
