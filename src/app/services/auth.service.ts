import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../models/user';
import { Roles } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginGoogleError$ = new Subject<any>();
  loginGoogleSuccess$ = new Subject<any>();

  loginPasswordError$ = new Subject<any>();
  loginPasswordSuccess$ = new Subject<any>();
 
  loginSuccess$ = new Subject<any>();

  logoutError$ = new Subject<any>();
  logoutSuccess$ = new Subject<any>();

  registerError$ = new Subject<any>();
  registerSuccess$ = new Subject<any>();

  sendEmailVerificationError$ = new Subject<any>();
  sendEmailVerificationSuccess$ = new Subject<any>();

  authState$ = new Subject<any>();

  authState: any;

  userCollectionRef: AngularFirestoreCollection<User>;
  user$: Observable<User[]>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.userCollectionRef = this.afs.collection<User>('users');
    this.user$ = this.userCollectionRef.valueChanges();

    afAuth.authState.subscribe(res => {
      this.authState = res;
      this.authState$.next(this.authState);
    })
    afAuth.user.subscribe(res => {
      this.authState = res;
    })
  }

  private insertNewUser(res) {
    this.afs.collection<User>('users').valueChanges().subscribe(users => {
      if (users.find(u => u.authuid == this.currentUserId) == null){
        console.log(res)
        this.userCollectionRef.add({ authuid: res.user.uid, name: res.user.displayName, role: Roles.USER, mail: res.user.email, photo: res.user.photoURL });
      }
        
    })

  }
  register(mail: string, password: string) {
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(mail, password)
      .then(res => {
        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(res => {
            this.sendEmailVerificationSuccess$.next(res);
          })
          .catch(error => {
            this.sendEmailVerificationError$.next(error);
          })
        this.registerSuccess$.next(res);
      })
      .catch(error => {
        this.registerError$.next(error);
      })
      ;
  }
  login(mail: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(mail, password)
      .then(res => {
        if (!res.user.emailVerified)
          this.logout();
        else
          this.insertNewUser(res);
        this.loginPasswordSuccess$.next(res);
        this.loginSuccess$.next(res);

      })
      .catch(res => {
        this.loginPasswordError$.next(res);
      })

  }
  loginGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithPopup(googleProvider)
      .then(res => {
        this.loginGoogleSuccess$.next(res);
        this.insertNewUser(res);
        this.loginSuccess$.next(res);
      })
      .catch(res => {
        this.loginGoogleError$.next(res);
      })
  }
  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        this.logoutSuccess$.next(res);
      })
      .catch(res => {
        this.logoutError$.next(res);
      })
  }
  get authenticated(): boolean {
     return this.authState != null && this.authState!= undefined && this.authState.emailVerified;
  }
  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
}
