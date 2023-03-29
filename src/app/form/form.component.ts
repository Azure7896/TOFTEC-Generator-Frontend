import {Component} from '@angular/core';
import {Termination} from "../termination";
import {TerminationService} from "../termination.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  termination: Termination = new Termination();

  isFieldError;

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    cityWithPostalCode: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    companyAddress: new FormControl('', [Validators.required]),
    companyCityWithPostalCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  })

  constructor(private terminationService: TerminationService) {}

  getErrorMessage(field): string {
    if (field.hasError('required')) {
      return 'Pole jest puste, podaj wartość';
    }
  }

  fieldHasError(field){
    this.isFieldError = !!field.hasError('required');
  }

  onSubmit(): void {
    console.warn(this.profileForm.value);
      this.terminationService.generate(this.profileForm);
  }
}
