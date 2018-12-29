import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService,private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.logoutSuccess$.subscribe(res=>{
      this.user = null;
    })
    this.userService.currentUser$.subscribe(user=>{
      this.user = user;
    })
    this.userService.getCurrentUser();
  }
  goToPerfil(){
    this.router.navigateByUrl('perfil')
  }
  goToAuth(){
    this.router.navigateByUrl('auth')
  }
}
