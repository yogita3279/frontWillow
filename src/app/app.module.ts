import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import {MatAutocompleteModule} from '@angular/material';
import{ AgmCoreModule, CircleManager,GoogleMapsAPIWrapper} from '@agm/core';
import { MapsAPILoader, AgmMap,AgmMarker,AgmCircle } from '@agm/core';

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



@NgModule({
  declarations: [
    AppComponent,
    BuyerComponent,
    SellerComponent,
    EmojiDirective,
    ModalComponent,
 
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
   
    
    
    MatProgressSpinnerModule,
    MatGoogleMapsAutocompleteModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeeXSRb_yBsk7t6phbcxKFpVN5GwxteRw',
      libraries: ['places']
    }),
      ],
  providers: [CircleManager,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }