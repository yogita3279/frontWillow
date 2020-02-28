import { Component, OnInit,ViewChild } from '@angular/core';
import { FormsModule,Validators,NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ImageSnippet } from '../buyer/models/ImageSnippet';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { v4 as uuid } from 'uuid';
import{EmojiDirective} from'../emoji.directive';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})


export class SellerComponent implements OnInit {
  data:any;
  model: any = {};
  private user: SocialUser;
  private loggedIn: boolean;

 formData:any;
 lat:any
 lng:any
 selectedFile:any;
 id:string;
 public homeType:string[] =["Single-Family","Condo","Townhouseode","Multi-Family"];
 public optionEntered:boolean = false;
 public option:string;

  constructor(private ps:PostService,private authService: AuthService) { }



  
  ngOnInit() {
    this.id=uuid.v4();
    console.log(this.id);

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });



  }
  
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.id)
      this.ps.uploadImage(this.selectedFile.file,this.id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
        
        })
    });

    reader.readAsDataURL(file);
  }
getLocation(){
  navigator.geolocation.getCurrentPosition((val)=>{
    this.lat = val.coords.latitude;
    this.lng = val.coords.longitude;
  })
}

private getSeletedOption(){
  if(this.option != null){
    this.optionEntered = true;
  }
}

  onSubmit(homeRegister) {
//Post the form data to the database
console.log("check value")
this.formData = homeRegister.value;
console.log("my form Value")
console.log(this.formData);


homeRegister.value.id = this.id;
homeRegister.value.lat = this.lat;
homeRegister.value.lng = this.lng;

this.data = this.ps.postData(homeRegister.value).subscribe((val)=>{
  console.log(val)
  console.log("Success")
alert('Bingo!! Your form is submitted Successfully :-)')
});


   
  }
  
  


  

}
