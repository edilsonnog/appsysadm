import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { AlunosService } from 'src/app/service/alunos.service';
import { Alunos } from 'src/app/model/alunos';



@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  alunos: Alunos[];
  nome: String;

  constructor(private alunosService: AlunosService, private service: NotificationsService) {
    this.alunos = [];
    this.nome = '';
  }

  ngOnInit(): void {
    this.alunosService.getAlunosList().subscribe(data => {
      this.alunos = data;
    });
  }

  deleteAluno(id: Number) {
    this.alunosService.deletarAluno(id).subscribe(data => {
      console.log("Retorno do metodo Delete: " + data)
      this.onSuccess('Aluno removido com Sucesso...');
      this.alunosService.getAlunosList().subscribe(data => {
        this.alunos = data;
      });
    });
  }

  consultaAluno() {
    this.alunosService.consultaAluno(this.nome).subscribe(data => {
      this.alunos = data;
    });
  }

  onSuccess(message: any) {
    this.service.success('Success', message, {
      position: ['top', 'right'],
      timeOut:2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: any) {
    this.service.error('Error', message, {
      position: ['top', 'left'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
}
