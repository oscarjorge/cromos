import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Roles } from '../models/enums';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }
  canActivate(): boolean {
    return this.userService.currentUser && this.userService.currentUser.role == Roles.ADMIN;
  }
}