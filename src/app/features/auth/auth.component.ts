import { GeneratedComponentDirective } from './../../shared/generated-component-directive/generated-component.directive';
import { AlertComponent } from './../../shared/alert/alert.component';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignupMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(GeneratedComponentDirective, {static: false}) alertHost: GeneratedComponentDirective;
  private closeAlertSub: Subscription;
  private storeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<fromAppReducer.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.error = authState.authError;
      if(this.error) {
        this.showErrorAlert(this.error);
      }
    })
  }
  ngOnDestroy() {
    if(this.closeAlertSub) {
      this.closeAlertSub.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }

  onSwitchMode() {
    this.isSignupMode = !this.isSignupMode;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if(!form.valid) {
      return "aw snap";
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isSignupMode) {
      // send signup request
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    } else {
      // login method
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  /**
   * Programmatic creation of a component
   * @param message an input to the created component
   */
  private showErrorAlert(message: string) {
    // create the component factory
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // retrieve the view container reference from the target ViewChild
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // clear any pre-existing elements
    hostViewContainerRef.clear();
    // create a reference to the component, so that we can act on it - set inputs, subscribe to events, etc.
    const componentReference = hostViewContainerRef.createComponent(alertCompFactory);
    
    componentReference.instance.message = message;
    this.closeAlertSub = componentReference.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
  }
}