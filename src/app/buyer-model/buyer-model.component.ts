import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-model',
  templateUrl: './buyer-model.component.html',
  styleUrls: ['./buyer-model.component.css']
})
export class BuyerModelComponent implements OnInit {
  public itemName: string;

  constructor() { }

  ngOnInit() {
  }

}
