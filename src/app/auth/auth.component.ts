import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'myclc-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: string;
  title: string;
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private headerService: HeaderService
  ) {
    // use FormBuilder to create a form group
    const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {

      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;

      // Set a title for the page accordingly
      const title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      this.headerService.setTitle(title);

      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  submitForm(): void {
    if (this.authForm.valid) {

      this.isSubmitting = true;
      this.errors = {errors: {}};

      const credentials = this.authForm.value;
      this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
  }
}
