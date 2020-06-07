import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService,
              private route: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.loginService.logOut();
    this.route.navigateByUrl('/login');
  }

}
