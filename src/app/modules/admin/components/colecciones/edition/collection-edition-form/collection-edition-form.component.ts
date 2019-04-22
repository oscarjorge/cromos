import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICollection, Collection } from 'src/app/models/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'collection-edition-form',
  templateUrl: './collection-edition-form.component.html',
  styleUrls: ['./collection-edition-form.component.less']
})
export class CollectionEditionFormComponent implements OnInit, OnChanges {
  @Input('collection') collection: ICollection;
  form: FormGroup;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadStateSubject$ = new Subject<any>();
  downloadURL$ = new Subject<any>();
  downloadURL: Observable<string>;

  constructor(
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes) {
    this.setForm();
  }
  setForm() {
    this.form = new FormGroup({
      name: new FormControl((this.collection) ? this.collection.name : '', Validators.required),
      description: new FormControl((this.collection) ? this.collection.description : ''),
      image: new FormControl((this.collection) ? this.collection.image : ''),
      brand: new FormControl((this.collection) ? this.collection.brand : ''),
      sticker_type: new FormControl((this.collection) ? this.collection.sticker_type : ''),
      price_packet: new FormControl((this.collection) ? this.collection.price_packet : ''),
      price_album: new FormControl((this.collection) ? this.collection.price_album : ''),
      url_page: new FormControl((this.collection) ? this.collection.url_page : ''),
      notes: new FormControl((this.collection) ? this.collection.notes : '')
    })
  }
  public getData():ICollection{
    if (this.form.valid) {
      const coll: Collection = new Collection();
      coll.uid = (this.collection.uid) ? this.collection.uid : null;
      coll.name = this.form.get('name').value;
      coll.description = this.form.get('description').value;
      coll.image = this.form.get('image').value;
      coll.brand = this.form.get('brand').value;
      coll.sticker_type = this.form.get('sticker_type').value;
      coll.price_packet = this.form.get('price_packet').value;
      coll.price_album = this.form.get('price_album').value;
      coll.url_page = this.form.get('url_page').value;
      coll.notes = this.form.get('notes').value;
      return coll;
      
    }
    return null;
  }

  upload(event) {
    if (this.collection.uid) {
      this.ref = this.afStorage.ref(`colecciones/${this.collection.uid}/cover/`);
      this.task = this.ref.put(event.target.files[0]);
      this.task.snapshotChanges().pipe(map(s => s.state)).subscribe(s => {
        this.uploadStateSubject$.next(s);
      });
      //parece ser que esto es un bug. El evento de success no lo lanza en el subscribe. Hay que recogerlo por aquí
      this.task.then(snapshot => {
        this.uploadStateSubject$.next(snapshot.state);
        if (snapshot.state === 'success')
          this.ref.getDownloadURL().subscribe(d => {
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
