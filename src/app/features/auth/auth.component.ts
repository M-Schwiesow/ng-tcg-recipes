import { Router } from '@angular/router';
import { AuthService, FirebaseAuthResponseData } from './auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isSignupMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

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
      this.error = errorResponse;
      this.isLoading = false;
    });
    form.reset();
  }

}