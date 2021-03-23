import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AlunoAddComponent } from "./componente/aluno-add/aluno-add.component";
import { AlunosComponent } from "./componente/alunos/alunos.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { GuardiaoGuard } from "./service/guardiao.guard";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { NgxMaskModule, IConfig} from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';



export const appRouters: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent },
  { path: 'alunosList', component: AlunosComponent, canActivate: [GuardiaoGuard]  },
  { path: 'alunoAdd', component: AlunoAddComponent, canActivate: [GuardiaoGuard]  },
  { path: 'alunoAdd/:id', component: AlunoAddComponent, canActivate: [GuardiaoGuard]  }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlunosComponent,
    AlunoAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routes,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
     // progressBar: true,
      progressAnimation: 'increasing'
    }),
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
