import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Termination} from "./termination";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class TerminationService {

  generateUrl: string;

  constructor(private http: HttpClient) {
    this.generateUrl='http://localhost:8080/generate';
  }

  public generate(form: FormGroup)  {
   return this.http.post("http://localhost:8080/generate", form.value, {observe: 'response', responseType: 'blob'})
  }
}
