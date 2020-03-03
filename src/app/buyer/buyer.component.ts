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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import{ FormGroup, FormBuilder, FormControl} from '@angular/forms';

import { BuyerModelComponent } from '../buyer-model/buyer-model.component';
import { JsonPipe } from '@angular/common';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

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
  formData:any;
  mysearchplace:any;

  private geoCoder;
  // Radius
  radius = 500;
  radiusLat = 0;
  radiusLong = 0;
  myForm: FormGroup;
  filteredProducts = [];
  filterByZip =[];
  filterByCity=[];
  markers: marker[] = [];
  myAddress:any=[];
  //markers: any[] = [{'lat': 7.289574289959695, 'lng': 80.63236355781555,},{ 'lat': 7.468432329097338, 'lng': 80.04151582717896,  }];

  public cards:string[];
  public locality:string;
  public reg:RegExp;
  public option:string;
  public searchOptions:string[] =["locality","address","zipcode","locality","address","zipcode","locality","address","zipcode","locality","address","zipcode"];
  public body:Condition[];
  public dataFromQuery:[];
  public optionEntered:boolean = false;
  public queryValue:string="";
  public operator:string = "=";
  PriceFilter = [
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 50000,
      "Values": null,
      "DisplayText": "$50000",
      "Order": null
    },
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 60000,
      "Values": null,
      "DisplayText": "$60000",
      "Order": null
    },
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 70000,
      "Values": null,
      "DisplayText": "$70000",
      "Order": null
    },

    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 80000,
      "Values": null,
      "DisplayText": "$80000",
      "Order": null
    },

    
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 90000,
      "Values": null,
      "DisplayText": "$90000",
      "Order": null
    },

    
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 100000,
      "Values": null,
      "DisplayText": "$100000",
      "Order": null
    },
  
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 200000,
      "Values": null,
      "DisplayText": "$200000",
      "Order": null
    },
  
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 300000,
      "Values": null,
      "DisplayText": "$300000",
      "Order": null
    },

    
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 400000,
      "Values": null,
      "DisplayText": "$400000",
      "Order": null
    },
    
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 500000,
      "Values": null,
      "DisplayText": "$500000",
      "Order": null
    },

    
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 600000,
      "Values": null,
      "DisplayText": "$600000",
      "Order": null
    },

    
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 700000,
      "Values": null,
      "DisplayText": "$700000",
      "Order": null
    },
  
  
    {
      "TagId": 20,
      "Type": "Budget",
      "Value": 800000,
      "Values": null,
      "DisplayText": "$800000",
      "city":"Bellevue",
      "Order": null
    },

  
  ]


  ZipcodeFilter = [
    {
      "TagId": 20,
      "Value":98004 ,
      "Values": null,
      "DisplayText": "98004",
      "Order": null,
      "Type": "Budget",

    },
    {
      "TagId": 20,
      "Value": 98007,
      "Values": null,
      "DisplayText": "98007",
    },
    {
      "TagId": 20,
      "Value": 98034,
      "Values": null,
      "DisplayText": "98034",
    },
    {
      "TagId": 20,
      "Value":98072,
      "Values": null,
      "DisplayText": "98072",
    },
    {
      "TagId": 20,
      "Value": 98027,
      "Values": null,
      "DisplayText": "98027",
    },  
  
  
  ]

  CityFilter = [
    {
      "TagId": 20,
      "Value":"Bellevue" ,
      "Values": null,
      "DisplayText": "Bellevue",
      "Order": null,
      "Type": "Budget",

    },
    {
      "TagId": 20,
      "Value": "Redmond",
      "Values": null,
      "DisplayText": "Redmond",
    },
    {
      "TagId": 20,
      "Value": "Seattle",
      "Values": null,
      "DisplayText": "Seattle",
    },
    {
      "TagId": 20,
      "Value":"Kirkland",
      "Values": null,
      "DisplayText": "Kirkland",
    },
    {
      "TagId": 20,
      "Value": "Issaquah",
      "Values": null,
      "DisplayText": "Issaquah",
    },  
    {
      "TagId": 20,
      "Value": "WoodinVille",
      "Values": null,
      "DisplayText": "WoodinVille",
    }, 
  
  
  ]

  Stores = [
    {
      "Products": [
        {
          "Price": 800000,
          "Beds": 6,
          "Bath":3,
          "Sqft": 2300 +"Sqft",
          "Address": "989 112 AVE NE, Bellevue,WA",
          "Zipcode":98004,
          "city":"Bellevue",
          "description":`Make a splash from the largest dock on Lake Sammamish.
           An everyday oasis destined for an exhilarating way of life on 177 of lakefront bound by 
           architectural precision, tumbling waterfalls & a rare indoor-outdoor 
           infinity edge pool. Meticulously crafted to host a few, or a 
           few hundred w/ a casually elegant lake house charm. 
           Whether marveling in secret spaces, floating down the lazy
            river or serving up volleyball on your private beach, an everlasting spirit of discovery 
            happily resides here.`
        },
        {
          "Price": 700000,
          "Beds": 4,
          "Bath":2.7,
          "Sqft":3000+" Sqft",
          "Address": "14027,Lake City Way,NE,Seattle",
          "Zipcode":98007,
          "city":"Seattle",
          "description":`What's not to love about this incredible Finn
          Hill home! This 6 bed, 2 bath rambler sits back on a large level lot!
           The home features abundance of natural light, a park-like setting private
            backyard w/ a garden space, shed & fire-pit! Newly remodeled home w/ a 
            BRAND new kitchen (all appliances included!), freshly painted interior, new flooring 
            throughout & a NEW roof! One car attached garage! Centrally located to restaurants,
             shopping & award winning Lake WA schools! Pre-inspection available!`
        },
        {
          "Price": 50000,
          "Beds": 1,
          "Bath":1,
          "Sqft": 900+ "Sqft",
          "Address": "1741 112 Apt-1701 NE, Redmond,WA",
          "Zipcode":98007,
          "city":"Redmond",
          "description":`What's not to love about this incredible Finn
          Hill home! This 6 bed, 2 bath rambler sits back on a large level lot!
           The home features abundance of natural light, a park-like setting private
            backyard w/ a garden space, shed & fire-pit! Newly remodeled home w/ a 
            BRAND new kitchen (all appliances included!), freshly painted interior, new flooring 
            throughout & a NEW roof! One car attached garage! Centrally located to restaurants,
             shopping & award winning Lake WA schools! Pre-inspection available!`
        },

        {
          "Price": 300000,
          "Beds": 2,
          "Bath":1.5,
          "Sqft": 1900+ "Sqft",
          "Address": "9106 NE 138th Pl, Kirkland, WA ",
          "Zipcode":98034,
          "city":"Kirkland",
          "description":`What's not to love about this incredible Finn
          Hill home! This 6 bed, 2 bath rambler sits back on a large level lot!
           The home features abundance of natural light, a park-like setting private
            backyard w/ a garden space, shed & fire-pit! Newly remodeled home w/ a 
            BRAND new kitchen (all appliances included!), freshly painted interior, new flooring 
            throughout & a NEW roof! One car attached garage! Centrally located to restaurants,
             shopping & award winning Lake WA schools! Pre-inspection available!`
        },

        {
          "Price": 750000,
          "Beds": 4,
          "Bath":2,
          "Sqft": 2000+ "Sqft",
          "Address": "17918 146th Ave NE, Woodinville, WA ",
          "Zipcode":98072,
          "city":"WoodinVille",
          "description":`What's not to love about this incredible Finn
          Hill home! This 6 bed, 2 bath rambler sits back on a large level lot!
           The home features abundance of natural light, a park-like setting private
            backyard w/ a garden space, shed & fire-pit! Newly remodeled home w/ a 
            BRAND new kitchen (all appliances included!), freshly painted interior, new flooring 
            throughout & a NEW roof! One car attached garage! Centrally located to restaurants,
             shopping & award winning Lake WA schools! Pre-inspection available!`
        },

        {
          "Price": 450000,
          "Beds": 2,
          "Bath":2,
          "Sqft": 1000+ "Sqft",
          "Address": "23503 SE 156th St, Issaquah, WA ",
          "Zipcode":98027,
          "city":"Issaquah",
          "description":`What's not to love about this incredible Finn
          Hill home! This 6 bed, 2 bath rambler sits back on a large level lot!
           The home features abundance of natural light, a park-like setting private
            backyard w/ a garden space, shed & fire-pit! Newly remodeled home w/ a 
            BRAND new kitchen (all appliances included!), freshly painted interior, new flooring 
            throughout & a NEW roof! One car attached garage! Centrally located to restaurants,
             shopping & award winning Lake WA schools! Pre-inspection available!`
        },
   
     
      ]
    }]
  
  @ViewChild('search', {static:false})
  public searchElementRef: ElementRef;

  constructor(private fb:FormBuilder, private dialog:MatDialog,private titleService: Title,private ps:PostService,private router:Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

      this.myForm = this.fb.group({
        filterProduct: ['']
      })

     }

     getValue(index) {
      if(index === 0)
        return { 
          lower: 0, 
          displayText: this.PriceFilter[index].DisplayText, 
          upper: this.PriceFilter[index].Value 
        };
      else {
        return { 
          lower: this.PriceFilter[index - 1].Value, 
          upper: this.PriceFilter[index].Value,
          displayText: `${this.PriceFilter[index - 1].DisplayText} - ${this.PriceFilter[index].DisplayText}`
        };
      }
    }

  ngOnInit() {

    this.filteredProducts = [...this.Stores[0].Products];
  
    this.myForm.get('filterProduct').valueChanges.subscribe(
      value => {
        console.log(value);
        this.filteredProducts = [...this.Stores[0].Products.filter(product => product.Price >= value.lower && product.Price <= value.upper )]
      }
    )


    
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
        console.log("myPlace"+ (JSON.stringify(place)));// searched address
        this.mysearchplace= place.formatted_address;
        console.log("ARE YOU SEARCHING "+this.mysearchplace);

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
      console.log("array of address" + JSON.stringify(results));
      for(let i=1 ;i<20;i++){

        this.myAddress.push(
          {
            formatted_address: results[i].formatted_address,
          }
        );


      }
      console.log(status)
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

  private openDialog(house:any){
   
    let dialogRef = this.dialog.open(BuyerModelComponent,{
      width:'100%',
      height:'100%',
  
    });

    dialogRef.componentInstance.itemName = house;//get the value
    
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

 


searchByAddress(){
  console.log("here")
console.log(this.mysearchplace);


}

  
    
  
  ngAfterViewInit() {
        
   }
  
   onSearch(searchArea) {
     var result=(searchArea.search);
     console.log(result);
    
    
        }


  
}
    
      


  





  
   
    
  



