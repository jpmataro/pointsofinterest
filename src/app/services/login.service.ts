import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwKyt0e2ASi6sE4Pm9IgZC0rVqMK2fOv0";

  infoFireBaseUser: any;
  userToken: string;

  constructor(
    private http: HttpClient
    ) { 
      this.getToken();
    }

  loginUser(email: any, password: any) {

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    return this.http.post(this.url, authData).pipe(
      map(resp => {
        this.infoFireBaseUser = resp;
        this.saveToken(resp['idToken']);
        return resp;
      })
    );;
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let today = new Date();
    
    today.setSeconds(this.infoFireBaseUser['expiresIn']);
    localStorage.setItem('expire', today.getTime().toString());
  }

  private getToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
  
  isAutenticated(): boolean {
    if(this.userToken.length < 2) {
      return false;
    }

    const expiration = Number(localStorage.getItem('expire'));
    const expirationDate = new Date();
    expirationDate.setTime(expiration);

    if(expirationDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('token')
  }
}
