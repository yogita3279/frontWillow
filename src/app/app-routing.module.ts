import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{BuyerComponent} from './buyer/buyer.component';
import{SellerComponent} from './seller/seller.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [

  {path:'buyer',component:BuyerComponent},
  {path:'seller',component:SellerComponent},
  {path:'buyer/buyerdetails',component:ModalComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
