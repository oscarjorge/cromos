import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  logged: boolean = null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
  }
  ngOnInit(): void {
    this.authService.loginSuccess$.subscribe(res => {
      this.logged = true;
      //debugger;
    })

    this.authService.authState$.subscribe(res => {
      this.logged = this.authService.authenticated;
      // if (!this.logged)
      //   this.router.navigateByUrl('/auth');
    })
  }
  goToAuth(){
    this.router.navigateByUrl('/auth');
  }
  
}
