import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class TerminationService {

  constructor(private http: HttpClient) {

  }

  public generate(form: FormGroup)  {
   return this.http.post("http://toftecgeneratorbackend-env.eba-fsxwwidj.eu-north-1.elasticbeanstalk.com/generate", form.value, {observe: 'response', responseType: 'blob'})
  }
}
