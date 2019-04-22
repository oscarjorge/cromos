import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.less']
})
export class ColeccionesComponent implements OnInit {
  criterio:string="";
  user: User;
  constructor(private authService: AuthService,private userService: UserService) { }

  ngOnInit() {
    this.authService.logoutSuccess$.subscribe(res=>{
      this.user = null;
    })
    this.userService.currentUser$.subscribe(user=>{
      this.user = user;
    })
    this.userService.getCurrentUser();
  }

}
