import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  buscaCEP(cep: String) {
   return this.http.get(`/cep/${cep}/json`);
  }

}
