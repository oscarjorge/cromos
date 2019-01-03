import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ICollection, Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'collection-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.less']
})
export class EditionComponent implements OnInit, OnChanges {
  @Input('collection')collection: ICollection;
  form: FormGroup;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadStateSubject$ = new Subject<any>();
  downloadURL$ = new Subject<any>();
  downloadURL: Observable<string>;
  constructor(
    private collectionService: CollectionService, 
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) { }
  ngOnChanges(changes){
    this.setForm();
  }
  ngOnInit() {
    
  }
  setForm(){
    this.form = new FormGroup({
      name: new FormControl((this.collection)?this.collection.name:'', Validators.required),
      description: new FormControl((this.collection)?this.collection.description:''),
      image: new FormControl((this.collection)?this.collection.image:'')
    })
  }
  save(){
    if(this.form.valid){
      const coll: Collection=new Collection();
      coll.uid= (this.collection)?this.collection.uid:null;
      coll.name= this.form.get('name').value;
      coll.description= this.form.get('description').value;
      coll.image= this.form.get('image').value;
      if(coll.uid==null)
        this.collectionService.create(coll)
      else
        this.collectionService.update(coll)
    }
  }
  upload(event) {
    if(this.collection.uid){
      this.ref = this.afStorage.ref(`colecciones/${this.collection.uid}/cover/`);
      this.task = this.ref.put(event.target.files[0]);
      this.task.snapshotChanges().pipe(map(s => s.state)).subscribe(s=>{
        this.uploadStateSubject$.next(s);
      });
      //parece ser que esto es un bug. El evento de success no lo lanza en el subscribe. Hay que recogerlo por aquí
      this.task.then(snapshot => {
        this.uploadStateSubject$.next(snapshot.state);
        if(snapshot.state==='success')
          this.ref.getDownloadURL().subscribe(d=>{
            this.downloadURL$.next(d);
           this.form.get('image').setValue(d);
          });
          
      }).catch(snapshot => {
        this.uploadStateSubject$.next(snapshot.state);
      });
  
      
      this.uploadProgress = this.task.percentageChanges();
    }
    
    
  }
}
