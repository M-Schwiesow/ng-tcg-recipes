import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    // this is a very small module, so splitting out its own router doesn't make much sense.  we can do it here.
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent },
    ]),
  ]
})
export class ShoppingListModule {}