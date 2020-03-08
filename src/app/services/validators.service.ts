import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  notMartinez(control: FormControl): ErrorValidate {
    if (control.value.toLowerCase() === 'martinez') {
      return {
        notMartinez: true
      };
    }

    return null;
  }

  passwordEquals(password1Name: string, password2Name: string) {
    return (formGroup: FormGroup) => {
      const password1Controls = formGroup.controls[password1Name];
      const password2Controls = formGroup.controls[password2Name];

      if (password2Controls.value === password1Controls.value) {
        password2Controls.setErrors(null);
      } else {
        password2Controls.setErrors({notEquals: true});
      }
    };
  }

  existUser(control: FormControl): Promise <ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'JesusMrtzTorres') {
          resolve({exist: true});
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
}
