import {Component} from '@angular/core';
import {Termination} from "../termination";
import {TerminationService} from "../termination.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  termination: Termination = new Termination();

  infoAfterGeneration: string;

  isButtonHidden: boolean = false;

  responseStatus;

  whatIsInstrumentalCase: string;



  terminationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    instrumentalCaseFirstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    instrumentalCaseLastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    cityWithPostalCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    companyAddress: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    companyCityWithPostalCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    terminationDocumentDate: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    employmentContractDate: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    terminationPeriod: new FormControl('', [Validators.required]),
  })

  constructor(private terminationService: TerminationService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pl-PL');
  }

  getErrorMessage(field): string {
    if (field.hasError('required')) {
      return 'Pole jest puste, podaj wartość';
    } else {
      return 'Niepoprawna ilość znaków'
    }
  }

  getDatePickerErrorMessage(field): string {
    if(field.hasError) {
      return 'Wybierz datę za pomocą kalendarza';
    }
  }

  generateTermination(): void {
    console.warn(this.terminationForm.value);
    this.terminationService.generate(this.terminationForm).subscribe(response => {
      let fileName = 'Wypowiedzenie' + this.terminationForm.get('firstName').value + this.terminationForm.get('lastName').value;
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();

      this.responseStatus = response.status;
    });

    this.isButtonHidden = true;

    this.infoAfterGeneration = "Proszę czekać, trwa generowanie dokumentu..."

    setTimeout(() => {
      if (this.responseStatus == 200) {
        this.infoAfterGeneration = "Wypowiedzenie zostało wygenerowane."
      } else {
        this.infoAfterGeneration = "Wystąpił błąd podczas generowania dokumentu. Spróbuj ponownie za chwilę.";
      }
    }, 1000);
  }

  viewInformationAboutInstrumentalCase() {
    this.whatIsInstrumentalCase = "Pomiędzy kim jest rozwiązywana umowa? Na przykład pomiędzy Janem Kowalskim."
  }
}
