import { Router } from '@angular/router';
import { Inscricao } from './../Models/Inscricao';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  title: string = 'Login';
  Inscricao: Inscricao = new Inscricao();
  cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private service: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.form = this.fb.group({
      cpf: ['', [
      Validators.required,
      Validators.minLength(14)
    ]],
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
    });

  }

  ngOnInit() {
  }

  Logar() {
    this.service.login(this.form.value).subscribe(
      success => {
        console.log(success);
        if(success) this.router.navigate(['/']);
      },
      error => console.log(error)
    );
  }

}
