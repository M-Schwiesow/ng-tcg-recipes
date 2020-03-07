import { AppComponent } from './app.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: AppComponent},
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', component: RecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}