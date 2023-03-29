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
    this.http.post("http://localhost:8080/generate", form.value).subscribe(res=>{
      //here you received the response of your post
      console.log(res);
      //you can do asomething, like
      alert("datos enviados");
    })
  }
}
