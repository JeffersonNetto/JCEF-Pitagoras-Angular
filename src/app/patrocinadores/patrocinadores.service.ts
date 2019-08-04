import { Injectable } from '@angular/core';
import { Patrocinador } from '../Models/Patrocinador';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  private readonly API = `${environment.API}patrocinadores`;  

  constructor(private http: HttpClient) { }

  getPatrocinadores() {    
    return this.http.get<Patrocinador[]>(this.API).pipe(take(1));
  }
}
