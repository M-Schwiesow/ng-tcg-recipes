import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './features/shopping-list/shopping-list.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './features/recipes/recipes.module';
import { CoreModule } from './core.module';

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
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
  ],
  // these can be provided from a core module, which would configure/manage commonly used services
  // providers: [
  //   ShoppingListService,
  //   RecipeService,
  //   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  // ],
  bootstrap: [AppComponent],
})
export class AppModule { }
