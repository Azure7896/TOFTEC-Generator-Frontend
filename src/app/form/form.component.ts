import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Termination} from "../termination";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  termination: Termination = new Termination();

  getErrorMessage(field): string {
    if (field.hasError('required' || field.hasError('min') || field.hasError('max'))) {
      return 'Pole jest puste, podaj wartość';
      // } else if ((field.hasError('min') || field.hasError('max'))) {
      //     return 'Błędna ilość znaków w polu. Spróbuj ponownie.';
      // }

    }
  }

  onSubmit(): void {
   console.log(this.termination);
  }
}
