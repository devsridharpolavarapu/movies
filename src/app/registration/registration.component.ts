import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { NewsConciergeResponse } from '../models/newsconcierge.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: boolean = false;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,

  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{5,10}$/)]))
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .subscribe(
        (response: NewsConciergeResponse) => {
          if (response.success) {
            this.loading = false;
            this.router.navigate(['/home']);
          }
          else {
            this.loading = false;
            this.error = true;
            this.message = response.message || "Error occured while registering the User. Please try again.";
          }

        },
        error => {
          this.loading = false;
          this.error = true;
          this.message = "Error occured while registering the User. Please try again.";

        });
  }

}
