import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './features/shopping-list/shopping-list.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListService } from './features/shopping-list/shopping-list.service';
import { RecipeService } from './features/recipes/recipe.service';
import { AuthInterceptorService } from './features/auth/auth-interceptor.service';
import { shoppingListReducer } from './features/shopping-list/store/shopping-list.reducer';
/*
TODOS:
  - Clean up references to ShoppingListService, remove class
*/
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
