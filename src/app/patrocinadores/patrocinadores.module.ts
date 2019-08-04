import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrocinadoresService } from './patrocinadores.service';
import { PatrocinadoresComponent } from './patrocinadores.component';

@NgModule({
  declarations: [
    PatrocinadoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  exports: [
    PatrocinadoresComponent
  ],
  providers: [
    PatrocinadoresService
  ]
})
export class PatrocinadoresModule { }
