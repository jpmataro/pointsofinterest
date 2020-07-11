import { Mark } from './../classes/mark.class';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestpointsService {

  private pointsCollection: AngularFirestoreCollection<Mark>;
  points: Observable<Mark[]>;

  constructor(private db: AngularFirestore) {}

   loadPlaces() {
    this.pointsCollection = this.db.collection<Mark>('points');
    return this.points = this.pointsCollection.valueChanges();
   }

   /* addPlace(location: Mark) {
    this.db.collection('points').add(location);
   } */

   /* editPlace() {

   } */
}
