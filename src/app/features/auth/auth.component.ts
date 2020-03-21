import { GeneratedComponentDirective } from './../../shared/generated-component-directive/generated-component.directive';
import { AlertComponent } from './../../shared/alert/alert.component';
import { Router } from '@angular/router';
import { AuthService, FirebaseAuthResponseData } from './auth.service';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isSignupMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(GeneratedComponentDirective, {static: false}) alertHost: GeneratedComponentDirective;
  private closeAlertSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnDestroy() {
    if(this.closeAlertSub) {
      this.closeAlertSub.unsubscribe();
    }
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

    let authObservable: Observable<FirebaseAuthResponseData>;

    this.isLoading = true;

    if(this.isSignupMode) {
      // send signup request
      authObservable = this.authService.signup(email,password);
    } else {
      // login method
      authObservable = this.authService.login(email, password);
    }
    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorResponse => {
      // this.error = errorResponse; // set error message for ngIf instantiation
      this.showErrorAlert(errorResponse);
      this.isLoading = false;
    });
    form.reset();
  }

  onHandleError() {
    console.log("onhandleerror")
    this.error = null;
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