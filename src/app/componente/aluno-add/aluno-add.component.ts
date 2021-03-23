import { ConsultaCepService } from './../../service/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from 'src/app/service/alunos.service';
import { Alunos } from 'src/app/model/alunos';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './aluno-add.component.html',
  styleUrls: ['./aluno-add.component.css'],
})
export class AlunoAddComponent implements OnInit {

  aluno = new Alunos();

  constructor(private routeActive: ActivatedRoute,
              private alunoService: AlunosService,
              private toastr: ToastrService,
              private router: Router,
              private http: HttpClient,
              private consultaceps: ConsultaCepService) { }

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
        this.router.navigate(['alunosList']);
      });
    } else {
      this.alunoService.salvarAluno(this.aluno).subscribe(data => {
        this.onSuccess('Aluno Salvo com Sucesso..');
        this.router.navigate(['alunosList']);
      });
    }
  }

  novo() {
    this.aluno = new Alunos();
  }

  buscaCep(valor: any){
    this.consultaceps.buscaCEP(valor).subscribe((data) => this.populaform(data));
  }

  populaform(data: any){
    this.aluno.cep =  data.cep,
    this.aluno.logradouro = data.logradouro,
    this.aluno.bairro = data.bairro,
    this.aluno.complemento = data.complemento,
    this.aluno.localidade = data.localidade,
    this.aluno.uf = data.uf
  }

  onSuccess(message: any) {
    this.toastr.success(message);
  }

  onError(message: any) {
    this.toastr.error(message);
  }

}
