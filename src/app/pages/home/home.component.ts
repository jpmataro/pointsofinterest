import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterestpointsService } from '../../services/interestpoints.service';
import { Mark } from '../../classes/mark.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  @ViewChild('newModal') el:ElementRef;
  
  itemsPoint: Mark[] = [];
  isLoading: boolean = true;
  isSaving: boolean = false;
  emptyLocation: boolean;

  addPlaceForm: FormGroup;

  constructor(public interestPointService: InterestpointsService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.formCreate();

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

  formCreate() {
    this.addPlaceForm = this.formBuilder.group({
      title:["", [Validators.required, Validators.minLength(6)]],
      description:[""]
    });
  }

  get titleValid() {
    return this.addPlaceForm.get('title').invalid && this.addPlaceForm.get('title').touched;
  }

  addNewLocation() {
    this.el.nativeElement.classList.add('is-active');
  }

  getPosition(options?: PositionOptions): Promise<Position> {
    this.isSaving = true;
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
  }

  async addNewPlace() {
    try {
      const position = await this.getPosition();
      let pointToAdd = {
        title: this.addPlaceForm.value.title,
        desc: this.addPlaceForm.value.description,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        uid: localStorage.getItem('uid')
      }

      this.interestPointService.addPlace(pointToAdd);
      this.closeModal();
      this.isSaving = false;

    } catch (err) {
        console.error(err.message);
    }
  }

  closeModal() {
    this.el.nativeElement.classList.remove('is-active');
  }

}
