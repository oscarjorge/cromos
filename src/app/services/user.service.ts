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

  // userCollectionRef: AngularFirestoreCollection<User>;
  // user$: Observable<User[]>;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    // this.userCollectionRef = this.afs.collection<User>('users');
    // this.user$ = this.userCollectionRef.valueChanges();
    this.authService.loginSuccess$.subscribe(res => {
      return this.findUser();
    })
  }
  private findUser() {
    return this.afs.collection('users').snapshotChanges().subscribe((usersSnapshot) => {
      const userSnapshot = usersSnapshot.find(u => u.payload.doc.get('authuid') == this.authService.currentUserId)
      if (userSnapshot) {
        this.currentUser = Object.assign(userSnapshot.payload.doc.data())
        this.currentUser.uid = userSnapshot.payload.doc.id;
        this.currentUser$.next(this.currentUser);
      }

    })
  }
  getCurrentUser() {
    return this.findUser();
  }
  updateUser(user: User): Promise<void> {
    return this.afs.collection('users').doc(user.uid).set(user);
  }
  updatePhoto(uid:string, photo: string): Promise<void> {
    return this.afs.collection('users').doc(uid).update({'photo':photo});
  }


}
