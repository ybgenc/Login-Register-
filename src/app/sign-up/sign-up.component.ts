import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  hide = true;
  checkerHide = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      surname: ["", [Validators.required, Validators.minLength(2)]],
      userID: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      rePassword: ["", [Validators.required, Validators.minLength(8)]],
      address: [""]
    }, {
      validators: this.passwordChecker('password', 'rePassword')
    });
  }

  passwordChecker(passwordKey: string, rePasswordKey: string): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const passwordControl = controls.get(passwordKey);
      const rePasswordControl = controls.get(rePasswordKey);

      if (passwordControl && rePasswordControl) {
        const password = passwordControl.value;
        const rePassword = rePasswordControl.value;

        if (password !== rePassword) {
          rePasswordControl.setErrors({ not_the_same: true });
          return { not_the_same: true };
        }
      }

      return null;
    };
  }
}
