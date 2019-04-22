import { Injectable } from '@angular/core';
import { ICollection, Collection } from '../models/collection';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collections:Observable<Collection[]>  ;
  constructor(private afs: AngularFirestore) {
    this.collections = <Observable<Collection[]>>this.afs.collection('collection').valueChanges();
    this.collections = this.afs.collection("collection").snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(
            a => {
              const data = a.payload.doc.data() as Collection;
              data.uid = a.payload.doc.id;
              return data;
            });
        }));

  }
  getData(){
    return this.collections;
  }
  get(){
    this.afs.collection('collection').get().subscribe(
      querySnapshot=> {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      },
      error=> {
        console.log("Error getting documents: ", error);
      }
    );
  }
  create(data: ICollection) {
    const plainData = JSON.parse(JSON.stringify(data));
    return this.afs.collection('collection').add(plainData);
  }
  update(data: ICollection) {
    const plainData = JSON.parse(JSON.stringify(data));
    return this.afs.collection('collection').doc(data.uid).set(plainData);
  }
  delete(data: ICollection) {
    return this.afs.collection('collection').doc(data.uid).delete();
  }
}
