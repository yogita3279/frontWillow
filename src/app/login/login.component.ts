
import { Component, OnInit } from '@angular/core';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';


 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  private user: SocialUser;
  private loggedIn: boolean;
 
  constructor(private authService: AuthService) { }
 
  ngOnInit() {
 
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log("User Logged in")
  }

  signOut(): void {
    this.authService.signOut();
    console.log("User Logged Out")
  }
 
 
}