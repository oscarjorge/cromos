import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth) {
  }
  canActivate(): Observable<boolean> {
    return this.afAuth.user
      .pipe(map(user =>
        user != null
      ));
  }
}