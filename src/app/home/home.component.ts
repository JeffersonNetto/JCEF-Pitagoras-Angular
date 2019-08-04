import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      p => {
        if (p['tid']) {
          this.router.navigate(['/retorno-pagamento'], { queryParams: { tid: p['tid'] } });
        }
      }
    ).unsubscribe();
  }
  
}
