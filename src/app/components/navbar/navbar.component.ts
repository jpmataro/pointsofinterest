import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,
              private route: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.loginService.logOut();
    this.route.navigateByUrl('/login');
  }

}
