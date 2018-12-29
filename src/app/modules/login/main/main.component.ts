import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  encapsulation: ViewEncapsulation.None,
  host:{'class': 'login-container'}
})
export class MainComponent implements OnInit {
  register: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.authService.sendEmailVerificationSuccess$
      .subscribe(res => {
        this.register = false;
      })
      this.authService.loginPasswordSuccess$
      .subscribe(res => {
        this.register = false;
        this.router.navigateByUrl('colecciones');
      })
      this.authService.loginPasswordError$
      .subscribe(res => {
        const ref = this.snackBar.open(res.message,'OK', {
          duration: 0,
        });
      })
      this.authService.loginGoogleSuccess$
      .subscribe(res => {
        this.register = false;
        this.router.navigateByUrl('colecciones');
      })
      this.authService.loginGoogleError$
      .subscribe(res => {
        const ref = this.snackBar.open(res.message,'OK', {
          duration: 0,
        });
      })
  }
  loginGoogle(){
    this.authService.loginGoogle()
  }
}
