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
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addItem(newIngredient);
  }
}
