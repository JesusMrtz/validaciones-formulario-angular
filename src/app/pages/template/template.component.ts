import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  user = {
    name: 'Jesus',
    lastName: 'Martínez',
    email: 'jesusmrtztorres@gmail.com',
    country: 'PRY'
  };
  countries: any[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(country => {
      this.countries = country;
      this.countries.unshift({
        name: 'Seleccione un país',
        code: ''
      });
    });
  }

  save(form: NgForm) {
    if ( form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
  }

}
