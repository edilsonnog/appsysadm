import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(tokenRequest).pipe(

        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
           // this.onSuccess('Sucesso na operação.');
          }
        })

        , catchError(this.processaError));
    } else {
      return next.handle(req).pipe(catchError(this.processaError));
    }

  }
  constructor(private toastr: ToastrService) { }

  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    } else {
      errorMessage = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;
    }
    this.onError(errorMessage);
    return throwError(errorMessage);
  }

  onError(message: any) {
    this.toastr.error(message);
  }

  onSuccess(message: any) {
    this.toastr.success(message);
  }

}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  ],
})

export class HttpInterceptorModule {

}

