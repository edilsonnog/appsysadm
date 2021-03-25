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

  alunos: Alunos[] = [];
  nome: string = '';
  p: number = 1;
  total: number = 0;

  constructor(private alunosService: AlunosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.alunosService.getAlunosList().subscribe(data => {
      this.alunos = data.content;
      this.total = data.totalElements;
    });
  }

  deleteAluno(id: String | Number) {
    if (confirm('Deseja mesmo remover?')) {
      this.alunosService.deletarAluno(id).subscribe(data => {
        console.log("Retorno do metodo Delete: " + data)
        this.onSuccess('Aluno removido com Sucesso...');
        this.alunosService.getAlunosList().subscribe(data => {
          this.alunos = data;
        });
      });
    }
  }

  consultaAluno() {
    if (this.nome === '') {
      this.alunosService.getAlunosList().subscribe(data => {
        this.alunos = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.alunosService.consultaAluno(this.nome).subscribe(data => {
        this.alunos = data.content;
        this.total = data.totalElements;
      });
    }
  }


  carregarPagina(pagina: any) {

    if (this.nome !== '') {
      this.alunosService.consultaAlunoPorPage(this.nome, pagina -1).subscribe(data => {
        this.alunos = data.content;
        this.total = data.totalElements;
      });
    }
    else {
      this.alunosService.getAlunosListPage(pagina - 1).subscribe(data => {
        this.alunos = data.content;
        this.total = data.totalElements;
      });
    }
  }

  onSuccess(message: any) {
    this.toastr.success('Success', message);
  }

  onError(message: any) {
    this.toastr.error('Error', message);
  }
}
