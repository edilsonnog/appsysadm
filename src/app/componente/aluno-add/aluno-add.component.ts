import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from 'src/app/service/alunos.service';
import { Alunos } from 'src/app/model/alunos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './aluno-add.component.html',
  styleUrls: ['./aluno-add.component.css'],
})
export class AlunoAddComponent implements OnInit {

  aluno = new Alunos();

  constructor(private routeActive: ActivatedRoute, private alunoService: AlunosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.alunoService.getAluno(id).subscribe(data => {
        this.aluno = data;
      })
    }
  }

  salvarAluno() {
    if (this.aluno.id != null && this.aluno.id.toString().trim() != null && this.aluno.id != '') {
      this.alunoService.updateAluno(this.aluno).subscribe(data => {
        this.onSuccess('Aluno Atualizado com Sucesso..');
      });
    } else {
      this.alunoService.salvarAluno(this.aluno).subscribe(data => {
        this.onSuccess('Aluno Salvo com Sucesso..')
      });
    }
  }

  novo() {
    this.aluno = new Alunos();
  }

  onSuccess(message: any) {
    this.toastr.success('Success', message);
  }

  onError(message: any) {
    this.toastr.error('Error', message);
  }
}
