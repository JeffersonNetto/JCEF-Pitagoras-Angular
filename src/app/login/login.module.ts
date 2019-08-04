import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-Text-Mask';

@NgModule({
  declarations: [
    LoginComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,      
    TextMaskModule  
  ],
  exports:[
    LoginComponent,        
  ],
  providers:[
    LoginService,    
  ]
})

export class LoginModule { }
