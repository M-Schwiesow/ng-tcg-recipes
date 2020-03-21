import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // { path: 'recipes', loadChildren: './features/recipes/recipes.module#RecipesModule' },
  { path: 'recipes', loadChildren: () => import('./features/recipes/recipes.module').then(mod => mod.RecipesModule)},
  /*
  this catch-all, which was fine when we had just one routing module causes all
  routes not explicitly caught by *this* routing module to redirect, circumventing
  all other/child routing modules
  */
  // { path: '**', redirectTo: '/recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}