import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Inscricao } from '../Models/Inscricao';
import { Evento } from '../Models/Evento';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  private readonly API = `${environment.API}inscricoes`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Inscricao[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadByID(id) {
    return this.http.get<Inscricao>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(inscricao) {    
    return this.http.post(this.API, inscricao).pipe(take(1));
  }

  private update(inscricao) {
    return this.http.put(`${this.API}/${inscricao.Id}`, inscricao).pipe(take(1));
  }

  save(inscricao) {
    if (inscricao.Id) {
      return this.update(inscricao);
    }
    return this.create(inscricao);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  getEventos(){
    return this.http.get<Evento[]>(`${environment.API}eventos`).pipe(take(1));
  }

  retornoPagamento(tid: string){
    return this.http.get(`${this.API}/retornopagamento/${tid}`).pipe(take(1));
  }
}
