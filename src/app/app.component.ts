import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appsysadm';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    $(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
      });
    });

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }

  }

  public sair() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderBarra() {
    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.toString().trim() !== null) {
      return false;
    } else {
      return true;
    }
  }
  

}
