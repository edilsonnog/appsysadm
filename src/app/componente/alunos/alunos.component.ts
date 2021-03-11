import { Component, OnInit } from '@angular/core';
import { AlunosService } from 'src/app/service/alunos.service';
import { Alunos } from 'src/app/model/alunos';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  alunos: Alunos[];
  nome: String;

  constructor(private alunosService: AlunosService, private toastr: ToastrService) {
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
    this.toastr.success('Success', message);
  }

  onError(message: any) {
    this.toastr.error('Error', message);
  }
}
