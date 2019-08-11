import { EmailService } from './../shared/email.service';
import { Evento } from './../Models/Evento';
import { Router } from '@angular/router';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscricao } from './../Models/Inscricao';
import { InscricaoService } from './inscricao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Email } from '../Models/Email';
import { $ } from 'protractor';

@Component({
  selector: 'app-inscricao-form',
  templateUrl: './inscricao-form.component.html',
  styleUrls: ['./inscricao-form.component.scss']
})

export class InscricaoFormComponent implements OnInit {

  form: FormGroup;
  title: string = 'Inscreva-se';
  inscricao: Inscricao = new Inscricao();
  
  palestras: Evento[] = [];
  eventosDoDia: Evento[] = [];
  eventos: Evento[] = [];
  cpfValue: string;
  cpfFormatadoValue: string;
  phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  exibirAlert: boolean = false;
  mensagem: string = "";
  email: Email = new Email();
  botoes: number[] = [];
  botaoAtivo: number;
  
  palestrasEscolhidas: Evento[] = [];
  
  //dataLimiteValorPromocional = new Date('2019-07-29 23:59:59');

  constructor(
    private service: InscricaoService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private emailService: EmailService
  ) {

    this.form = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      cpf: ['', [
        Validators.required,
        Validators.minLength(14)
      ]],
      telefone: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      categoria: this.fb.group({
        codigo: ['', Validators.required],
        descricao: [''],
        valor: [''],
      }),
      statusPagamento: this.fb.group({
        codigo: [1],
        descricao: ['Pendente'],
      }),
      eventos: [Validators.required]
    });
  }

  ngOnInit() {
    this.service.getEventos().subscribe(
      success => {                

        this.palestras = success.filter((e) => e.tipoEvento.codigo == 1);

        this.eventos = success;

        this.definirBotoes();

      },
      error => {
        console.log(error);
      }
    );

    //console.log(this.form.controls);
  }

  guardaValorCPFFormatado(evento) {
    this.cpfFormatadoValue = evento;
  }

  definirBotoes() {
    this.palestras.forEach((e) => {
      if (this.botoes.length == 0) {
        this.botoes.push(e.diaDaSemana);
      }
      else if (!this.botoes.includes(e.diaDaSemana)) {
        this.botoes.push(e.diaDaSemana);
      }
    });

    this.botoes.sort();
  }

  Salvar() {

    this.form.patchValue({
      eventos: this.inscricao.eventos
    });
    this.spinner.show();
    this.service.save(this.form.value).subscribe(
      (success) => {
        //console.log('retornoinscricao', success);
        this.exibirAlert = true;

        this.email.email = success['email'];
        this.email.assunto = "Pré-inscrição realizada com sucesso";
        this.email.mensagem = `
        Seja Bem Vindo a I Jornada Científica da Educação Física da Faculdade Pitágoras! É um prazer tê-lo conosco em nosso evento.<br /><br />
        Sua pré-inscrição foi realizada com sucesso! Para confirmá-la, acesse o link abaixo e efetue o pagamento.<br /><br />
        <a href='${success['urlPagSeguro']}'>${success['urlPagSeguro']}</a><br /><br />
        Após o pagamento, você será redirecionado ao site. Caso isso não aconteça automaticamente, clique no link " voltar para a loja".
        <br/><br/>
        Atenciosamente,<br/><br/>
        I Jornada Científica da Educação Física - Faculdade Pitágoras Ipatinga<br/><br/>
        Comissão Organizadora<br /><br />`;

        this.emailService.EnviarInscricaoConfirmada(this.email).subscribe(
          success => console.log(success),
          error => {
            console.log(error);
            this.emailService.EnviarInscricaoConfirmadaGearHost(this.email).subscribe(
              s => console.log(s),
              e => console.log(e),
              () => console.log('completou email gearhost')
            )
          },
          () => console.log('completou email somee')
        );

      },
      error => console.log(error),
      () => this.spinner.hide()
    );
  }

  onChange(value: number) {

    //let v;    

    if (value == 1) {

      //v = new Date() < this.dataLimiteValorPromocional ? 40 : 55;

      this.form.patchValue({
        categoria: { codigo: 1, descricao: 'Aluno', valor: 30 }
      });
    } else if (value == 2) {

      //v = new Date() < this.dataLimiteValorPromocional ? 40 : 55;

      this.form.patchValue({
        categoria: { codigo: 2, descricao: 'Não aluno', valor: 40 }
      });
    } 
    else {
      this.form.patchValue({
        categoria: { codigo: null, descricao: null, valor: null }
      });
    }

    console.log('categoria', this.form.controls['categoria'])
  }

  ExibirEventosDoDia(dia: number) {
    this.botaoAtivo = dia;
    this.eventosDoDia = this.palestras.filter(
      (e) => e.diaDaSemana == dia
    );

  }

  ExibirEventosEscolhidos(evento: Evento) {

    //console.log('entrou')

    evento.escolhido = true;

    if (this.inscricao.eventos && this.inscricao.eventos.length > 0) {
      this.inscricao.eventos = this.inscricao.eventos.filter(
        (e) => e.diaDaSemana !== evento.diaDaSemana
      );
    }

    if (evento.tipoEvento.codigo == 1) {

      this.palestras.map((p) => {
        if (p.diaDaSemana == evento.diaDaSemana && p.codigo != evento.codigo) {
          p.escolhido = false;
        }
      });

      this.palestrasEscolhidas = this.palestrasEscolhidas.filter(
        (e) => e.diaDaSemana !== evento.diaDaSemana
      );

      this.palestrasEscolhidas.push(evento);
      this.palestrasEscolhidas.sort((a, b) => { return a.diaDaSemana - b.diaDaSemana });
      
    }

    this.inscricao.eventos.push(evento);

    
    // console.log('palestras', this.palestras);
    // console.log('eventos', this.eventos);
    
    // console.log('palestrasEscolhidas', this.palestrasEscolhidas);
    // console.log('inscricao.eventos', this.inscricao.eventos);
  }

  changeFocus() {
    window.location.hash = '';
    window.location.hash = '#divEventosEscolhidos';
  }

  nomeValido(nome: string) {
    var reTipo = /[A-z][ ][A-z]/;
    return reTipo.test(nome) && nome.length >= 6;
  }

  cpfValido(cpf: string) {
    let result = cpf.replace(/_/g, '').replace('-', '').replace(/\./g, '');
    //console.log(result);
    return result.length == 11;
  }

  telefoneValido(telefone: string) {
    let result = telefone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').replace(/_/g, '');
    return result.length >= 10;
  }
}
