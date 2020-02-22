import { Component, OnInit } from '@angular/core';
// import { MapsAPILoader, AgmMap } from '@agm/core';
import {  AfterViewInit, ViewChild, ElementRef } from 
'@angular/core';
import {Title} from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { PostService } from '../services/post.service';
import { equal } from 'assert';
import { Condition } from './models/Condition';
import {Router} from "@angular/router";
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements AfterViewInit {
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public lat: number;
  public lng: number;
  public cards:string[];
  public locality:string;
  public reg:RegExp;
  public option:string;
  public searchOptions:string[] =["locality","address","zipcode"];
  public body:Condition[];
  public dataFromQuery:[];
  public optionEntered:boolean = false;
  public queryValue:string="";
  public operator:string = "=";
  
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  constructor(private titleService: Title,private ps:PostService,private router:Router) { }

  ngOnInit() {

    this.cards=["title","title1","title2","title3","title4"]
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
    this.zoom = 10;
    this.lat = 47.751076;
    this.lng = -120.740135;
      this.setCurrentPosition();

  }
  private getSeletedOption(){
    if(this.option != null){
      this.optionEntered = true;
    }
   
   
  }
  private getQueryData(){
    let c:Condition = new Condition(this.option,this.operator,this.queryValue); 
    this.body =[c];
    console.log(this.body);   

     this.ps.searchData(this.body).subscribe((val:any)=>{
       this.dataFromQuery = val;
        console.log(val);

     });
   

  }
  private getSelectedHouseInformation(selectedHouse){
    this.router.navigate(['buyer','buyerdetails']);
    console.log(selectedHouse);
    this.ps.setselectedHouseData(selectedHouse);
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        
       
        this.zoom = 12;
      });
    }
  }

  
  
  ngAfterViewInit() {
        
   }
  
   onSearch(searchArea) {
     var result=(searchArea.search);
     console.log(result);
    
    
        }

   
    
  
}


