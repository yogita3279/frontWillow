import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  buyerDetails:{};
  selectedHouseImages:[];

  constructor(private ps:PostService) { 
    this.buyerDetails = ps.getselectedHouseData();
  }

  ngOnInit() {

  }

}
