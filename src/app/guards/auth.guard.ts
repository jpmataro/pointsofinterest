import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private route: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.loginService.isAutenticated()){
      return true;
    } else {
      this.route.navigateByUrl('/login')
      return false;
    }
  }
  
}
