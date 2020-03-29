import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../features/store/app.reducer';
import * as AuthActions from '../features/auth/store/auth.actions';
import * as RecipeActions from '../features/recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
      this.userSubscription = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onLoadData() {
    this.store.dispatch(new RecipeActions.GetRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
