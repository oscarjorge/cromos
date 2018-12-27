import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  logged: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.authService.authState$.subscribe(res => {
      console.log('authState')
      this.logged = this.authService.authenticated;
      if (!this.logged)
        this.router.navigateByUrl('/auth');
    })
  }
  register() {
    this.router.navigateByUrl('auth/register')
  }
  logout() {
    this.authService.logout();
  }
}
