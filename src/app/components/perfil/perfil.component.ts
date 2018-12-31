import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  user: User;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  uploadStateSubject$ = new Subject<any>();
  downloadURL$ = new Subject<any>();
  downloadURL: Observable<string>;
  boysAvatars: number[]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  girlsAvatars: number[]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.setForm();
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      this.setForm();
    }
    )

  }
  setForm(){
    if(this.user){
      this.form = new FormGroup({
        mail: new FormControl(this.user.mail, Validators.required),
        name: new FormControl(this.user.name, Validators.required),
        allowShared: new FormControl(this.user.allowShared),
        allowLocation: new FormControl(this.user.allowLocation)
      })
     
    }
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`${this.user.uid}/avatar/`);
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
          this.updateAvatar(d);

        });
        
    }).catch(snapshot => {
      this.uploadStateSubject$.next(snapshot.state);
       // To know whenever there is an error/cancel from user
    });

    
    this.uploadProgress = this.task.percentageChanges();
    
  }
  updateAvatar(avatar:string){
    this.userService.updatePhoto(this.user.uid,avatar)
    .then(()=>
      this.snackBar.open('El avatar del usuario se ha actualizado.', 'OK')
    )
    .catch(()=>{
      this.snackBar.open('Se ha producido un error al actualizar el avatar del usuario.', 'OK')
    })
  }
  guardar() {
    if(this.form.valid){
      const userToUpdate: User =
      {
        uid: this.user.uid,
        authuid: this.user.authuid,
        photo: this.user.photo,
        mail: this.form.get('mail').value,
        name: this.form.get('name').value,
        role: this.user.role,
        allowShared: this.form.get('allowShared').value,
        allowLocation: this.form.get('allowLocation').value
      };
      this.userService.updateUser(
        userToUpdate
      )
      .then(()=>
        this.snackBar.open('El perfil del usuario se ha actualizado.', 'OK')
      )
      .catch(()=>{
        this.snackBar.open('Se ha producido un error al actualizar el perfil del usuario.', 'OK')
      })
    }
  }
  getImg(index, boy){
    return `assets/avatares/${(boy)?'boy':'girl'} (${index}).png`;
  }
  
}
