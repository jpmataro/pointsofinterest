import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
    ) {
      this.formCreate();
     }

  ngOnInit(): void {
  }

  get userValid() {
    return this.registerForm.get('user').invalid && this.registerForm.get('user').touched;
  }

  get passValid() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }

  get checkSamePass() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('repeatPassword').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  formCreate() {
    this.registerForm = this.formBuilder.group({
      user:["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:["", [Validators.required, Validators.minLength(6)]],
      repeatPassword:["", Validators.required],
    });
  }

  register() {
    let userEmail = this.registerForm.get('user').value;
    let password = this.registerForm.get('password').value;

    if(this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Please wait...',
      icon: 'info',
    })

    Swal.showLoading();

    this.registerService.registerUser(userEmail, password).subscribe((result: any) => {
      Swal.close();
      this.router.navigateByUrl('/login');
    }, (error: any) => {
      console.error(error.error.error.message);
      Swal.fire({
        title: 'Resgistation failed',
        text: 'Email exists or invalid password',
        icon: 'error',
      })
    })

  }

}
