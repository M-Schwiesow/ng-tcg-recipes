import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingredientChangeSubscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); // note you can still subscribe as normal
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => this.ingredients = ingredients
    // );
  }

  ngOnDestroy() {
    // this.ingredientChangeSubscription.unsubscribe();
  }

  onEditItem(ingredientIndex: number) {
    // this.shoppingListService.startedEditing.next(ingredientIndex);
    this.store.dispatch(new ShoppingListActions.StartEdit(ingredientIndex));
  }

}