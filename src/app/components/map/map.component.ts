import { Component, OnInit, Input } from '@angular/core';
/* import { Mark } from '../../classes/mark.class'; */

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  @Input() mark: any;

  /* marks: Mark[] = []; */

  latitude = 41.3947688;
  longitude = 2.0787278;
  mapType = 'roadmap';
  zoom = 12;
  
  constructor() {
    
   }

  ngOnInit(): void {

  }

}
