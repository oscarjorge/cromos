import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../models/credential';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credentials: Credentials = new Credentials();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      mail: new FormControl(this.credentials.mail, Validators.required),
      password: new FormControl(this.credentials.password, Validators.required)
    })
  }
  login() {
    if(this.loginForm.valid)
      this.authService.login(this.loginForm.get('mail').value, this.loginForm.get('password').value);
  }
}
