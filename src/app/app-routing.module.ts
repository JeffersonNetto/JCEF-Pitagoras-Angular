import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscricaoFormComponent } from './inscricao-form/inscricao-form.component';
import { RetornoPagamentoComponent } from './retorno-pagamento/retorno-pagamento.component';

const routes: Routes = [  
  { path: '', component: HomeComponent },    
  { path: 'inscricao', component: InscricaoFormComponent },  
  { path: 'login', component: LoginComponent },  
  { path: 'retorno-pagamento', component: RetornoPagamentoComponent },
  { path: '**', redirectTo: '' },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}