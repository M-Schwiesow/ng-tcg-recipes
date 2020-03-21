import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // Note there are two different ways to loadChildren - the function is more modern; I wonder what it does, exactly.
  { path: 'recipes', loadChildren: () => import('./features/recipes/recipes.module').then(mod => mod.RecipesModule)},
  { path: 'shopping-list', loadChildren: () => import('./features/shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)},
  { path: 'auth', loadChildren: './features/auth/auth.module#AuthModule'}
  /*
  this catch-all, which was fine when we had just one routing module causes all
  routes not explicitly caught by *this* routing module to redirect, circumventing
  all other/child routing modules
  */
  // { path: '**', redirectTo: '/recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],  // look into preloading strategies to see how to preload only certain routes/components
  exports: [RouterModule]
})
export class AppRoutingModule {

}