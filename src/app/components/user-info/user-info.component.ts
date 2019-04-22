import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Roles } from 'src/app/models/enums';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
  user: User;
  isAdmin: boolean=false;
  constructor(private authService: AuthService,private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.logoutSuccess$.subscribe(res=>{
      this.user = null;
      this.isAdmin=false;
    })
    this.userService.currentUser$.subscribe(user=>{
      this.user = user;
      this.isAdmin = user && user.role == Roles.ADMIN;
    })
    this.userService.getCurrentUser();
  }
  goToPerfil(){
    this.router.navigateByUrl('perfil')
  }
  goToAuth(){
    this.router.navigateByUrl('auth')
  }
  logout() {
    this.authService.logout();
  }
}
