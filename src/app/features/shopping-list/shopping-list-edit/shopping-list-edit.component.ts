import { take, map, exhaustMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../../shared/ingredient.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromShoppingList from './../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  shoppingListSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('shoppingListForm', {static: false}) form: NgForm;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    /**
     * Candidate B
     */
      // this.shoppingListSubscription = this.shoppingListService.startedEditing
      // .subscribe((index: number) => {
      //   this.editMode = true;
      //   this.editedItemIndex = index;
      //   this.store.select('shoppingList').pipe(take(1), tap(ingredients => {
      //     console.log('store response, ingredients: ', ingredients);
      //     this.editedItem = {
      //       ...ingredients.ingredients[this.editedItemIndex]
      //     };
      //     console.log('this.editedItem after setting: ', this.editedItem);
      //     this.form.setValue({
      //       name: this.editedItem.name,
      //       amount: this.editedItem.amount
      //     });
      //   })).subscribe();
      // });
      /**
       * Third Path
       */
      this.shoppingListSubscription = this.store.select('shoppingList').subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = {...stateData.editedIngredient};
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
          this.editedItemIndex = stateData.editedIngredientIndex;
        } else {
          this.editMode = false;
        }
      });
    //   /**
    //    * Original
    //    */
    //   this.shoppingListSubscription = this.shoppingListService.startedEditing
    //   .subscribe((index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.form.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   });

  }

  ngOnDestroy() {
    this.shoppingListSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem(form: NgForm) {
    if(this.editMode) {
      this.editedItem.name = form.value.name;
      this.editedItem.amount = form.value.amount;
      // this.shoppingListService.editIngredient(this.editedItem);
      this.store.dispatch(new ShoppingListActions.EditIngredient(this.editedItem));
      this.editMode = false;
      form.reset();
    } else {
      const value = form.value;
      const newIngredient = new Ingredient(Math.random(), value.name, value.amount);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addItem(newIngredient);
      form.reset();
    }
  }

  onClear(form: NgForm) {
    this.editMode = false;
    form.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(form: NgForm) {
    // this.shoppingListService.removeIngredient(this.editedItem);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear(form);
  }
}
