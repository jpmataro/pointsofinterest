import { Component, OnInit } from '@angular/core';
import { InterestpointsService } from '../../services/interestpoints.service';
import { Mark } from '../../classes/mark.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  itemsPoint: Mark[] = [];
  isLoading: boolean = true;
  emptyLocation: boolean;

  constructor(public interestPointService: InterestpointsService) {
    this.interestPointService.loadPlaces().subscribe((resp) => {
      this.itemsPoint = resp;
      if (this.itemsPoint.length <= 0) {
        this.emptyLocation = true;
      } else {
        this.emptyLocation = false;
      }
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
