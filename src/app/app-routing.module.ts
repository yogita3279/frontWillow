import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{BuyerComponent} from './buyer/buyer.component';
import{SellerComponent} from './seller/seller.component';
import{LoginComponent} from './login/login.component';
import{BuyerModelComponent} from './buyer-model/buyer-model.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'buyer',component:BuyerComponent},
  {path:'seller',component:SellerComponent},
  {path:'buyer/buyerdetails',component:ModalComponent},
  {path:'buyermodel',component:BuyerModelComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
