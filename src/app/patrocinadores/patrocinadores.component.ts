import { Component, OnInit } from '@angular/core';

import { Patrocinador } from './../Models/Patrocinador';
import { PatrocinadoresService } from './patrocinadores.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.component.html',
  styleUrls: ['./patrocinadores.component.scss']
})
export class PatrocinadoresComponent implements OnInit {

  Patrocinadores: Patrocinador[];

  constructor(
    private service: PatrocinadoresService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getPatrocinadores().subscribe(
      success => {        
        this.Patrocinadores = success;
      },
      error => console.log(error),
      () => this.spinner.hide()
    );
  }

}
