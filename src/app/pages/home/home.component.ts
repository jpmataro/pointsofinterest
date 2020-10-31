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
  isEdit: boolean;
  emptyLocation: boolean;
  filteredUserPlaces: any = [];

  addPlaceForm: FormGroup;

  constructor(public interestPointService: InterestpointsService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.formCreate();

    this.interestPointService.loadPlaces().subscribe((resp) => {
      this.itemsPoint = resp;

      this.filteredUserPlaces = resp.filter(data => {
          return data.uid === localStorage.getItem('uid');
      });

      if (this.filteredUserPlaces.length <= 0) {
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
      id: [""],
      title:["", [Validators.required, Validators.minLength(6)]],
      description:[""]
    });
  }

  get titleValid() {
    return this.addPlaceForm.get('title').invalid && this.addPlaceForm.get('title').touched;
  }

  addNewLocation() {
    this.isEdit = false;
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
    this.addPlaceForm.reset();
    this.el.nativeElement.classList.remove('is-active');
  }

  editLocation(point: any) {
    this.isEdit = true;
    this.el.nativeElement.classList.add('is-active');

    this.addPlaceForm.setValue({
      id: point.id,
      title: point.title,
      description: point.desc
    });
    
  }

  editPlace() {
    let pointToEdit: any = {
      id: this.addPlaceForm.value.id,
      title: this.addPlaceForm.value.title,
      desc: this.addPlaceForm.value.description
    }

    this.interestPointService.editPlacePoint(pointToEdit);
    this.closeModal();
      this.isSaving = false;
  }

  viewInMap(pointId: any) {
    this.router.navigate(['/viewmap', pointId]);
  }

}
