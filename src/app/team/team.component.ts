import { Component, OnInit } from '@angular/core';

import { TeamService } from './team.service';
import { Palestrante } from './../Models/Palestrante';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  Palestrantes: Palestrante[];
  

  ngOnInit() {    
    this.spinner.show();
    this.service.getPalestrantes().subscribe(
      success => {        
        this.Palestrantes = success;
      },
      error => console.log(error),
      () => this.spinner.hide()
    );

  }
  
  constructor(    
    private service: TeamService,
    private spinner: NgxSpinnerService,
    ) { }

  

}
