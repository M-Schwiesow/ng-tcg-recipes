import { GeneratedComponentDirective } from './shared/generated-component-directive/generated-component.directive';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthInterceptorService } from './features/auth/auth-interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './features/auth/auth.component';
import { RecipeService } from './features/recipes/recipe.service';
import { ShoppingListService } from './features/shopping-list/shopping-list.service';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShoppingListEditComponent } from './features/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './features/recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    GeneratedComponentDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  /**
   * Angular <= 8 requires the entryComponents property for creating Components programmatically
   * Angular 9+ does not require the below property
   */
  entryComponents: [
    AlertComponent,
  ]
})
export class AppModule { }
