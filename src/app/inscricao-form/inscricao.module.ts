

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscricaoService } from './inscricao.service';
import { InscricaoFormComponent } from './inscricao-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KzMaskDirective } from './../kz-mask.directive';
import { TextMaskModule } from 'angular2-Text-Mask';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    InscricaoFormComponent,
    KzMaskDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,     
    TextMaskModule,
    NgxSpinnerModule
  ],
  exports:[
    InscricaoFormComponent,        
  ],
  providers:[
    InscricaoService,    
  ]
})

export class InscricaoModule { }
