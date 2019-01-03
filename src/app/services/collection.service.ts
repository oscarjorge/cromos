import { Injectable } from '@angular/core';
import { ICollection } from '../models/collection';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collectionsError$ = new Subject<any>();
  collectionsSuccess$ = new Subject<ICollection[]>();
  constructor(private afs: AngularFirestore) { 
    
    
  }
  
  getCollections(){
    this.afs.collection('collection').snapshotChanges()
    .subscribe(
      (collectionsSnapshot) => {
        const collections: ICollection[]=[];
        collectionsSnapshot.forEach(c=>{
          const collection: ICollection = {
            uid: c.payload.doc.id,
            name: c.payload.doc.get('name'),
            description: c.payload.doc.get('description'),
            image: c.payload.doc.get('image')
          };
          collections.push(collection);
        })
        this.collectionsSuccess$.next(collections)
      },
      (error)=>{
        this.collectionsError$.next(error);
      }
    )
  }
  create(data:ICollection){
    console.log('a');
    return this.afs.collection('collection').add(Object.assign({}, data));
  }
  update(data:ICollection){
    return this.afs.collection('collection').doc(data.uid).set(Object.assign({}, data));
  }
  delete(data:ICollection){
    return this.afs.collection('collection').doc(data.uid).delete();
  }
}
