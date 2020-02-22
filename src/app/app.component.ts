import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { importType } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']



})
export class AppComponent {
  title = 'Willow';
   
  ngOnInit() {
  }



 
}
