import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor( 
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { 
    this.formCreate();
  }

  ngOnInit(): void {
  }

  get userValid() {
    return this.loginForm.get('user').invalid && this.loginForm.get('user').touched;
  }

  get passValid() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  formCreate() {
    this.loginForm = this.formBuilder.group({
      user:["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:["", [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    let userEmail = this.loginForm.get('user').value;
    let password = this.loginForm.get('password').value;

    if(this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Please wait...',
      icon: 'info',
    })

    Swal.showLoading();

    this.loginService.loginUser(userEmail, password).subscribe((result: any) => {
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (error: any) => {
      console.error(error.error.error.message);
      Swal.fire({
        title: 'Authentication failed',
        text: 'Invalid email or password',
        icon: 'error',
      })
    })

  }

}
