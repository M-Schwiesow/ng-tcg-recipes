import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeService } from './features/recipes/recipe.service';
import { ShoppingListService } from './features/shopping-list/shopping-list.service';
import { AuthInterceptorService } from './features/auth/auth-interceptor.service';

/*
This is an example of a module which manages and provides common services for an application.
Use of a module like this can make your main AppModule leaner, as well as make it easy to 
manage your various services.  It is an alternative to using {providedIn: 'root'} in your
services.
*/
@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class CoreModule {}