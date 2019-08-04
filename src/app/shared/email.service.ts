import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Email } from '../Models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly API = `http://sefpitagoras.somee.com/api/email`;

  constructor(private http: HttpClient) { }

  EnviarInscricaoConfirmada(email: Email){
    console.log('EnviarInscricaoConfirmada', email);
    return this.http.post(this.API, email).pipe(take(1));
  }

  EnviarInscricaoConfirmadaGearHost(email: Email){
    console.log('EnviarInscricaoConfirmada', email);
    return this.http.post('http://sefpitagorasemail.gearhostpreview.com/api/email', email).pipe(take(1));
  }
}
