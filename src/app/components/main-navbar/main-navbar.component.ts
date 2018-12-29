import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Roles } from 'src/app/models/enums';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.less']
})
export class MainNavbarComponent implements OnInit {
  user: User;
  isAdmin: boolean=false;
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { 
    this.authService.logoutSuccess$.subscribe(res=>{
      router.navigateByUrl('colecciones');
      this.user = null;
    })
  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user=>{
      this.user = user;
      this.isAdmin = user && user.role == Roles.ADMIN;
    })
    this.authService.logoutSuccess$.subscribe(user=>{
      this.user = null;
      this.isAdmin=false;
    })
  }
  logout() {
      this.authService.logout();
  }
  
}
