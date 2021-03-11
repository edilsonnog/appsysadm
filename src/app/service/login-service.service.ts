import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  login(usuario: any) {
    //console.info(JSON.stringify(usuario))
   //console.info("Token: " + localStorage.getItem("token"));
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem("token", token);

      this.onSuccess('Login realizado com Sucesso...');

      this.router.navigate(['home']);

     // console.info("Token: " + localStorage.getItem("token"));

    },
      error => {
        console.error("Erro ao fazer login");
        this.onError('Acesso Negado!');
      }
    );
  }
//--proxy-config proxy.conf.js
onSuccess(message: any) {
  this.toastr.success('Success', message);
}

onError(message: any) {
  this.toastr.error('Error', message);
}
}
