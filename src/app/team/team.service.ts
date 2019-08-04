import { Injectable } from '@angular/core';
import { Palestrante } from '../Models/Palestrante';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly API = `${environment.API}palestrantes`;  

  constructor(private http: HttpClient) { }

  getPalestrantes() {    
    return this.http.get<Palestrante[]>(this.API).pipe(take(1));
  }
}
