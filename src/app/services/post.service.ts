import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Condition } from '../buyer/models/Condition';

  
@Injectable({
  providedIn: 'root'
})
export class PostService {
   url:string="http://localhost:8080/sellers/properties";
   postUrl:string="http://localhost:8080/sellers/create";
   imageUploadUrl:string="http://localhost:8080/image/?id="
   selectedHouseInformation:{};
  constructor(private HttpClient:HttpClient) 
  {
    
   }
   uploadImage(seletedImage:File,uuid){
  
    return this.HttpClient.post(this.imageUploadUrl+uuid,seletedImage);

   }
   setselectedHouseData(selectedData){
    this.selectedHouseInformation = selectedData;
   }

   getselectedHouseData():{}{
     return this.selectedHouseInformation;
   }

   searchData(c:Condition[]){
   return this.HttpClient.post(this.url,c);
   }

   postData(myData){
    return this.HttpClient.post(this.postUrl,myData);

   }
  
}