import { map } from 'rxjs/operators';
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
    return this.points = this.pointsCollection.snapshotChanges().pipe(map((dataPoints => {
      return dataPoints.map( a => {
        const data = a.payload.doc.data() as Mark;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })));
   }

   addPlace(pointToAdd: any) {
     return this.db.collection('points').add(pointToAdd);
   }

   removePlace(locationId: string) {
    return this.pointsCollection.doc(locationId).delete();
   }

   editPlacePoint(point: any) {
    return this.db.collection("points").doc(point.id).update({
      "title": point.title,
      "desc": point.desc
    });
   }
}
