import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingredientChangeSubscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => this.ingredients = ingredients
    // );
  }

  ngOnDestroy() {
    // this.ingredientChangeSubscription.unsubscribe();
  }

  onEditItem(ingredientIndex: number) {
    this.shoppingListService.startedEditing.next(ingredientIndex);
  }

}