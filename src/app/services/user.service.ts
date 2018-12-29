import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Subject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  currentUserError$ = new Subject<any>();
  currentUser$ = new Subject<User>();

  userCollectionRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;
  constructor(private afs: AngularFirestore, private authService:AuthService) { 
    this.userCollectionRef = this.afs.collection<User>('users');
    this.user$ = this.userCollectionRef.valueChanges();
    this.authService.loginSuccess$.subscribe(res=>{
      this.afs.collection<User>('users').valueChanges().subscribe(users=> {
        this.currentUser = users.find(u => u.authuid == this.authService.currentUserId);
        this.currentUser$.next(this.currentUser);
      }
      );
    })
  }

  getCurrentUser(){
    this.user$.subscribe(users => {
      this.currentUser = users.find(u => u.authuid == this.authService.currentUserId);
      this.currentUser$.next(this.currentUser);
    })
  }
  

}
