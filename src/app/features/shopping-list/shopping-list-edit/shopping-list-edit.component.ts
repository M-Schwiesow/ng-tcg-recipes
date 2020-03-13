import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../../shared/ingredient.model';
import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListSubscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });

  }

  ngOnDestroy() {
    this.shoppingListSubscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    if(this.editMode) {
      this.editedItem.name = form.value.name;
      this.editedItem.amount = form.value.amount;
      this.shoppingListService.editIngredient(this.editedItem);
      this.editMode = false;
      form.reset();
    } else {
      const value = form.value;
      const newIngredient = new Ingredient(Math.random(), value.name, value.amount);
      console.log("So this is a new ingredient, apparently: ", newIngredient);
      this.shoppingListService.addItem(newIngredient);
      form.reset();
    }
  }

  onClear(form: NgForm) {
    this.editMode = false;
    form.reset();
  }

  onDelete(form: NgForm) {
    this.shoppingListService.removeIngredient(this.editedItem);
    this.onClear(form);
  }
}
