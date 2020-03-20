import { AuthGuard } from './features/auth/auth.guard';
import { AuthComponent } from './features/auth/auth.component';
import { RecipesResolverService } from './features/recipes/recipes-resolver.service';
import { RecipeEditComponent } from './features/recipes/recipe-edit/recipe-edit.component';
import { RecipeLandingComponent } from './features/recipes/recipe-landing/recipe-landing.component';
import { RecipeDetailComponent } from './features/recipes/recipe-detail/recipe-detail.component';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes',
   component: RecipesComponent,
   canActivate: [AuthGuard],
   children: [
    { path: '', component: RecipeLandingComponent, pathMatch: 'full' },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}