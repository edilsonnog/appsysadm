import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private service: NotificationsService, private router: Router) { }

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
