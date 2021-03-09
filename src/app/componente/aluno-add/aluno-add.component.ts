import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from 'src/app/service/alunos.service';
import { Alunos } from 'src/app/model/alunos';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './aluno-add.component.html',
  styleUrls: ['./aluno-add.component.css'],
})
export class AlunoAddComponent implements OnInit {

  aluno = new Alunos();

  constructor(private routeActive: ActivatedRoute, private alunoService: AlunosService, private service: NotificationsService) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.alunoService.getAluno(id).subscribe(data => {
        this.aluno = data;
      })
    }
  }

  salvarAluno() {
    if (this.aluno.id != null && this.aluno.id.toString().trim() != null && this.aluno.id != '' ) {
      this.alunoService.updateAluno(this.aluno).subscribe(data => {
        this.onSuccess('Aluno Atualizado com Sucesso..');
      });
    } else {
      this.alunoService.salvarAluno(this.aluno).subscribe(data => {
        this.onSuccess('Aluno Salvo com Sucesso..')
      });
    }
  }

  novo(){
    this.aluno = new Alunos();
  }

  onSuccess(message: any) {
    this.service.success('Success', message, {
      position: ['top', 'right'],
      timeOut: 3000,
      // animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: any) {
    this.service.error('Error', message, {
      position: ['top', 'left'],
      timeOut: 3000,
      //  animate: 'fade',
      showProgressBar: true
    });
  }
}
