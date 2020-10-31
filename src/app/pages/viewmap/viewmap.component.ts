import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterestpointsService } from '../../services/interestpoints.service';
import { Mark } from '../../classes/mark.class';

@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.component.html',
  styleUrls: ['./viewmap.component.sass']
})
export class ViewmapComponent implements OnInit {

  /* pointInfo: any[] = []; */
  pointInfo: Mark[] = [];

  constructor(private activateRoute: ActivatedRoute,
              public interestpointsService: InterestpointsService) { 
    this.activateRoute.params.subscribe(param => {
      this.interestpointsService.getPlace(param['id']).subscribe((pointMap: any) => {
        this.pointInfo = pointMap.data();
      });
    })
  }

  ngOnInit(): void {
  }

}
