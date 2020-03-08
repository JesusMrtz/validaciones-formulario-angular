import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private validatorsService: ValidatorsService) {
    this.createForm();
    this.loadDataToForm();
    this.createListeners();
  }

  ngOnInit(): void {}

  get lastNameInvalid() {
    return this.form.get('lastName').invalid && this.form.get('lastName').touched;
  }

  get nameInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get userInvalid() {
    return this.form.get('user').invalid && this.form.get('user').touched;
  }

  get passwordInvalid() {
    return this.form.get('password1').invalid && this.form.get('password1').touched;
  }

  get passwordRepeatInvalid() {
    const password = this.form.get('password1').value;
    const repeatPassword = this.form.get('password2').value;

    return (password === repeatPassword) ? false : true;
  }

  get districtInvalid() {
    return this.form.get('address.district').invalid && this.form.get('address.district').touched;
  }

  get cityInvalid() {
    return this.form.get('address.city').invalid && this.form.get('address.city').touched;
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]
    ],
      lastName: ['', [Validators.required, this.validatorsService.notMartinez]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ],
    ],
      user: ['', , this.validatorsService.existUser],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      address: this.formBuilder.group({
        district: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([])
    },
    {
      validators: [this.validatorsService.passwordEquals('password1', 'password2')]
    });
  }

  loadDataToForm() {
    /*this.form.setValue({
      name: 'Jesus',
      lastName: 'Martínez',
      email: 'jesusmrtztorres@gmail.com',
      address: {
        district: 'Pensiones',
        city: 'Mérida'
      }
    });*/

    this.form.reset({
      name: 'Jesus',
      lastName: 'Martínez',
      email: 'jesusmrtztorres@gmail.com',
      password1: '123',
      password2: '123',
      address: {
        district: 'Mérida',
        city: 'Mérida'
      }
    });

  }

  createListeners() {
    /*this.form.valueChanges.subscribe( value => {
      console.log(value);
    });

    this.form.statusChanges.subscribe(value => {
      console.log({status: value});
    });*/

    this.form.get('name').statusChanges.subscribe(value => {
      console.log(value);
    })
  }

  addHobbie() {
    this.hobbies.push(this.formBuilder.control('', Validators.required));
  }

  deleteHobbie(index: number) {
    this.hobbies.removeAt(index);
  }

  save() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( (control: any) => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      // Posteo de la información
      this.form.reset({
        name: 'Carlos'
      });
    }
  }

}
