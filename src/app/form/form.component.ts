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

  isButtonDisabled: boolean = true;

  infoAfterGeneration: string;

  isButtonHidden: boolean = false;

  responseStatus;

  whatIsInstrumentalCase: string;


  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    instrumentalCaseFirstName: new FormControl('', [Validators.required]),
    instrumentalCaseLastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    cityWithPostalCode: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    companyAddress: new FormControl('', [Validators.required]),
    companyCityWithPostalCode: new FormControl('', [Validators.required]),
    terminationDocumentDate: new FormControl('', [Validators.required]),
    employmentContractDate: new FormControl('', [Validators.required]),
  })

  constructor(private terminationService: TerminationService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pl-PL');
  }

  getErrorMessage(field): string {
    if (field.hasError('required')) {
      this.isButtonDisabled = true;
      return 'Pole jest puste, podaj wartość';
    } else {
      this.isButtonDisabled = false;
      return '';
    }
  }

  generateTermination(): void {
    console.warn(this.profileForm.value);
    this.terminationService.generate(this.profileForm).subscribe(response => {
      let fileName = 'Wypowiedzenie' + this.profileForm.get('firstName').value + this.profileForm.get('lastName').value;
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

  viewInformationWhatIsInstrumentalCase() {
    this.whatIsInstrumentalCase = "Pomiędzy kim jest rozwiązywana umowa? Na przykład pomiędzy Janem Kowalskim."
  }
}
