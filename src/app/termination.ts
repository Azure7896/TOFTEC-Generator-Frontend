import {FormControl, Validators} from "@angular/forms";

export class Termination {

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  cityWithPostalCode = new FormControl('', [Validators.required]);
  companyName = new FormControl('', [Validators.required])
  companyAddress = new FormControl('', [Validators.required])
  companyCityWithPostalCode = new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)])

}
