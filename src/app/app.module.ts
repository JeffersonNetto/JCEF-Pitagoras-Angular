import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { InscricaoModule } from './inscricao-form/inscricao.module';
import { HttpClientModule } from '@angular/common/http';
import { RetornoPagamentoComponent } from './retorno-pagamento/retorno-pagamento.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PatrocinadoresModule } from './patrocinadores/patrocinadores.module';
import { TeamModule } from './team/team.module';
import { LoginModule } from './login/login.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,    
    ContactComponent,
    HomeComponent,
    RetornoPagamentoComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InscricaoModule,
    AppRoutingModule, 
    HttpClientModule,
    LoginModule,
    TeamModule,
    PatrocinadoresModule,
    NgxSpinnerModule
  ],
  exports: [ 
    HeaderComponent, 
    FooterComponent
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
