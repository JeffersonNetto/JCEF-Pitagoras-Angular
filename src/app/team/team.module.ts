import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { TeamService } from './team.service';

@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  exports: [
    TeamComponent
  ],
  providers: [
    TeamService
  ]
})
export class TeamModule { }
