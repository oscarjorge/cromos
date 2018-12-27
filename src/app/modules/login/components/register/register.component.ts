import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Credentials } from '../../models/credential';
import { AngularFireAuth } from '@angular/fire/auth';
import {  MustMatch } from '../../validators/password-validator';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  credentials: Credentials = new Credentials();
  constructor(
     private authService: AuthService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });

      this.authService.sendEmailVerificationSuccess$
      .subscribe(res => {
        console.log(res);
        const ref = this.snackBar.open('El usuario se ha registrado correctamente. Revise su mail para verificar su cuenta.','OK', {
          duration: 0,
        });
        // ref.onAction().subscribe(()=>{
        //   this.router.navigateByUrl('');
        // })
      })
      this.authService.registerError$
      .subscribe(error=>{
        this.snackBar.open(`Se ha producido un error al registrar el usuario. ${error.message}`,'OK', {
          duration: 0,
        });
      })
      this.authService.sendEmailVerificationError$
      .subscribe(error=>{
        this.snackBar.open(`Se ha producido un error al enviar el mail de confirmación. ${error.message}`,null, {
          duration: 2500,
        });
      })
  }
  
  register() {
    if(this.registerForm.valid)
      this.authService.register(this.registerForm.get('mail').value, this.registerForm.get('password').value)
        // .sub(res=>{
        //   console.log(res)
        //   const ref = this.snackBar.open('El usuario se ha registrado correctamente. Revise su mail para verificar su cuenta.','OK', {
        //     duration: 0,
        //   });
        //   ref.onAction().subscribe(()=>{
        //     this.router.navigateByUrl('auth/login');
        //   })
        // })
        // .catch(error=>{
        //   this.snackBar.open(`Se ha producido un error al registrar el usuario. ${error.message}`,null, {
        //     duration: 2500,
        //   });
        // })
        // ;
  }

}
