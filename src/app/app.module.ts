import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import {MatAutocompleteModule,MatDialogModule} from '@angular/material';
import{ AgmCoreModule, CircleManager,GoogleMapsAPIWrapper} from '@agm/core';
import { MapsAPILoader, AgmMap,AgmMarker,AgmCircle } from '@agm/core';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';



import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatProgressSpinnerModule } from '@angular/material';
  
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { EmojiDirective } from './emoji.directive';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { BuyerModelComponent } from './buyer-model/buyer-model.component';



let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("808759572232-b1o93rtii62mf4unf4ikdiuqdg42avc2.apps.googleusercontent.com")
  }
 
]);
 
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    BuyerComponent,
    SellerComponent,
    EmojiDirective,
    ModalComponent,
    LoginComponent,
    BuyerModelComponent,
 
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterLinkDelayModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    SocialLoginModule,       
    MatProgressSpinnerModule,
    MatGoogleMapsAutocompleteModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeeXSRb_yBsk7t6phbcxKFpVN5GwxteRw',
      libraries: ['places']
    }),
      ],
  providers: [CircleManager,GoogleMapsAPIWrapper, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }