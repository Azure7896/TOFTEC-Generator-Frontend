import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  cityWithPostalCode = new FormControl('', [Validators.required]);

  getErrorMessage(field) {
    if (field.hasError('required')) {
      return 'Pole jest puste, podaj wartość';
    }

    return field.hasError('email') ? 'Niepoprawny adres email' : '';
  }
}
