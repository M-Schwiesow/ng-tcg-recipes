import { RecipesRoutingModule } from './recipes-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeLandingComponent } from './recipe-landing/recipe-landing.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeLandingComponent,
    RecipeItemComponent,
  ],
  imports: [
    RecipesRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule {}