import { Store } from '@ngrx/store';
import { AuthService } from './features/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as fromAppReducer from './features/store/app.reducer';
import * as AuthActions from './features/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-tcg-recipes';

  constructor(private store: Store<fromAppReducer.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AuthAutoLogin());
  }
}
