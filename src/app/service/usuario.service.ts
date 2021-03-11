import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  userAutenticado() {
    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}
