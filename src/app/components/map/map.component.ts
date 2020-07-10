import { Component, OnInit } from '@angular/core';
import { Mark } from '../../classes/mark.class';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  marks: Mark[] = [];

  latitude = 41.3947688;
  longitude = 2.0787278;
  mapType = 'roadmap';
  zoom = 12;
  
  constructor() {
    const newMarker = new Mark(this.latitude, this.longitude);
    this.marks.push(newMarker);
   }

  ngOnInit(): void {
  }

  addMarker(event: any) {
    console.log(event);
    const newMarker = new Mark(event.coords.lat, event.coords.lng);
    this.marks.push(newMarker);
  }

}
