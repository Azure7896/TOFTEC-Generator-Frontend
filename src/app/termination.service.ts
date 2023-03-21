import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Termination} from "./termination";

@Injectable({
  providedIn: 'root'
})

export class TerminationService {

  generateUrl: string;

  constructor(private http: HttpClient) {
    this.generateUrl='http://localhost:8080/generate';
  }

  public generate(termination: Termination)  {
    return this.http.post<Termination>(this.generateUrl, termination);
  }
}
