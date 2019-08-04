import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Inscricao } from '../Models/Inscricao';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = `${environment.API}inscricoes/login`;

  constructor(private http: HttpClient) { }

  login(inscricao) {    
    return this.http.post(this.API, inscricao).pipe(take(1));
  }
}
