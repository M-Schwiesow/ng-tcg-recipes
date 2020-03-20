import { Subscription } from 'rxjs';
import { AuthService } from './../features/auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      // this.isAuthenticated = !!user;  // it ain't no thing

    });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLoadData() {
    // stuff!
    this.dataStorageService.fetchRecipes().subscribe();;
  }

  onLogout() {
    this.authService.logout();
  }
}
