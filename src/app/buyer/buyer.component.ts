import { Component, OnInit, NgZone,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, AgmMap,AgmInfoWindow,AgmCircle,AgmMarker } from '@agm/core';
import {Title} from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { PostService } from '../services/post.service';
import { equal } from 'assert';
import { Condition } from './models/Condition';
import {Router} from "@angular/router";
import {MouseEvent} from "@agm/core";

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
   draggable: boolean;
   content?:string;
   isShown:boolean;
   icon:string;
 }

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})



export class BuyerComponent implements OnInit {
  public zoom: number;
  public latitude: number;
  public longitude: number;
  address: string;
  private geoCoder;
  // Radius
  radius = 500;
  radiusLat = 0;
  radiusLong = 0;
 
  markers: marker[] = []
  //markers: any[] = [{'lat': 7.289574289959695, 'lng': 80.63236355781555,},{ 'lat': 7.468432329097338, 'lng': 80.04151582717896,  }];

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
  
  @ViewChild('search', {static:false})
  public searchElementRef: ElementRef;

  constructor(private titleService: Title,private ps:PostService,private router:Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {


    
    this.cards=["title","title1","title2","title3","title4"]
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

        //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
    this.setCurrentPosition();
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 17;
      });
    });
  });
  }
  // Get Current Location Coordinates
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
        this.radiusLat = this.latitude;
        this.radiusLong = this.longitude;
        this.zoom = 6;
       
        for(let i=1;i<50;i++){
          this.markers.push(
            {
              lat: this.latitude+Math.random(),
              lng: this.longitude+Math.random(),
              label: `${i}`,
              draggable: false,
              content: `Content no ${i}`,
              isShown:false,
              icon:'../assets/marker-red.png'
            }
          );
        }
      });
    }
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
 
  radiusDragEnd($event: any) {
    console.log($event);
    this.radiusLat = $event.coords.lat;
    this.radiusLong = $event.coords.lng;
    this.showHideMarkers();
  }
 
  event(type,$event) {
    console.log(type,$event);
    this.radius = $event;
    this.showHideMarkers();
  }
 
  showHideMarkers(){
    Object.values(this.markers).forEach(value => {
      value.isShown = this.getDistanceBetween(value.lat,value.lng,this.radiusLat,this.radiusLong);
    });
  }

  getDistanceBetween(lat1,long1,lat2,long2){
    var from = new google.maps.LatLng(lat1,long1);
    var to = new google.maps.LatLng(lat2,long2);
 
    if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= this.radius){    
      console.log('Radius',this.radius);
      console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
        from,to
      ));
      return true;
    }else{
      return false;
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
    

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
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

 




  
    
  
  ngAfterViewInit() {
        
   }
  
   onSearch(searchArea) {
     var result=(searchArea.search);
     console.log(result);
    
    
        }


  
}
    
      


  





  
   
    
  



