import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(private http: HttpClient) { }

  getAlunosList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseAluno);
  }

  getAlunosListPage(pagina: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseAluno + 'page/' + pagina);
  }

  getAluno(id: Number | String): Observable<any> {
    return this.http.get<any>(AppConstants.baseAluno + id);
  }

  deletarAluno(id: String | Number): Observable<any> {
    return this.http.delete(AppConstants.baseAluno + id, { responseType: 'text' });
  }

  consultaAluno(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseAluno + "alunoPorNome/" + nome);
  }

  consultaAlunoPorPage(nome: String, page: Number): Observable<any> {
    return this.http.get(AppConstants.baseAluno + "alunoPorNome/" + nome + "/page/" + page);
  }

  salvarAluno(aluno: any) : Observable<any> {
    return this.http.post<any>(AppConstants.baseAluno, aluno);
  }

  updateAluno(aluno: any) : Observable<any> {
    return this.http.put<any>(AppConstants.baseAluno, aluno);
  }


}
