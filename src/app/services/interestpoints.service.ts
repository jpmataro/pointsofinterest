import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Mark } from '../classes/mark.class';

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
}
