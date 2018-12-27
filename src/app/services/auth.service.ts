import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginGoogleError$ = new Subject<any>();
  loginGoogleSuccess$ = new Subject<any>();

  loginError$ = new Subject<any>();
  loginSuccess$ = new Subject<any>();

  logoutError$ = new Subject<any>();
  logoutSuccess$ = new Subject<any>();

  registerError$ = new Subject<any>();
  registerSuccess$ = new Subject<any>();

  sendEmailVerificationError$ = new Subject<any>();
  sendEmailVerificationSuccess$ = new Subject<any>();

  authState$ = new Subject<any>();

  authState: any;
  constructor(
    public afAuth: AngularFireAuth
    ) { 
      afAuth.authState.subscribe(res=>{
        
        this.authState = res;
        this.authState$.next(this.authState);
      })
    }
    register(mail:string, password: string){
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(mail, password)
        .then(res=>{
          this.afAuth.auth.currentUser.sendEmailVerification()
            .then(res=>{
              this.sendEmailVerificationSuccess$.next(res);
            })
            .catch(error=>{
              this.sendEmailVerificationError$.next(error);
            })
          this.registerSuccess$.next(res);
        })
        .catch(error=>{
          this.registerError$.next(error);
        })
        ;
    }
    login(mail:string, password: string){
      this.afAuth.auth.signInWithEmailAndPassword(mail, password)
      .then(res=>{
        if(!res.user.emailVerified)
          this.logout();
        this.loginSuccess$.next(res);
        
      })
      .catch(res=>{
        this.loginError$.next(res);
      })

    }
    loginGoogle(){
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      
      this.afAuth.auth.signInWithPopup(googleProvider)
      .then(res=>{
        this.loginGoogleSuccess$.next(res);
      })
      .catch(res=>{
        this.loginGoogleError$.next(res);
      })
    }
    logout(){
      this.afAuth.auth.signOut()
      .then(res=>{
        this.logoutSuccess$.next(res);
      })
      .catch(res=>{
        this.logoutError$.next(res);
      })
    }
    get authenticated(): boolean {
      return this.authState !== null && this.authState.emailVerified;
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
