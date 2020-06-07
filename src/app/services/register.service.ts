import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwKyt0e2ASi6sE4Pm9IgZC0rVqMK2fOv0";

  userToken: string;

  constructor(
    private http: HttpClient
    ) {
      this.getToken();
     }

  registerUser(email: any, password: any) {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    return this.http.post(this.url, authData).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  private getToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  } 
}
