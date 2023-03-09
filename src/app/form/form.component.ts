import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  email = new FormControl('Imię', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Pole jest puste, podaj wartość';
    }

    return this.email.hasError('email') ? 'Niepoprawny adres email' : '';
  }
}
