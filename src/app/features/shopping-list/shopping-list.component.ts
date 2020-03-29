import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingredientChangeSubscription: Subscription;
  
  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); // note you can still subscribe as normal

  }

  ngOnDestroy() {
    // this.ingredientChangeSubscription.unsubscribe();
  }

  onEditItem(ingredientIndex: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(ingredientIndex));
  }

}