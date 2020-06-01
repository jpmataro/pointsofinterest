import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor( private formBuilder: FormBuilder) { 
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
      user:["", Validators.required],
      password:["", Validators.required],
    });
  }

  login() {
    console.log(this.loginForm);
    if(this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }

}
