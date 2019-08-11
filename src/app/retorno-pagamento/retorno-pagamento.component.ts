import { RetornoInscricao } from './../Models/Inscricao';
import { Component, OnInit } from '@angular/core';
import { InscricaoService } from '../inscricao-form/inscricao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailService } from '../shared/email.service';
import { Email } from '../Models/Email';

@Component({
  selector: 'app-retorno-pagamento',
  templateUrl: './retorno-pagamento.component.html',
  styleUrls: ['./retorno-pagamento.component.scss']
})
export class RetornoPagamentoComponent implements OnInit {

  tid: string;
  RetornoInscricao: RetornoInscricao = new RetornoInscricao();
  email: Email = new Email();

  constructor(
    private service: InscricaoService,
    private spinner: NgxSpinnerService,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      p => { this.tid = p['tid']; }
    ).unsubscribe();    

    if(this.tid == '' || this.tid == null || this.tid == undefined){
      this.router.navigate(['']);
    }
    else{
      this.service.retornoPagamento(this.tid).subscribe(
        (success: RetornoInscricao) => {
  
          //console.log('success', success);
  
          this.RetornoInscricao = success;
  
          if (success.inscricao.statusPagamento.codigo == 2) {
  
            this.email.assunto = "Inscrição confirmada com sucesso";
            this.email.email = this.RetornoInscricao.inscricao.email;
            this.email.nome = this.RetornoInscricao.inscricao.nome;
            this.email.mensagem = `Olá <em>${this.RetornoInscricao.inscricao.nome}</em><br /><br />Sua inscrição está confirmada!<br /><br />`;
            this.email.mensagem += "Eventos escolhidos:<br /><br />";
  
            this.RetornoInscricao.inscricao.eventos.sort((a, b) => { return a.diaDaSemana - b.diaDaSemana });
            
            this.RetornoInscricao.inscricao.eventos.forEach((e) => {
  
              let palestrantes:string = '';
  
              e.palestrantes.forEach((p) => {
                if(palestrantes != ''){
                  palestrantes += ", " + p.nome;
                }
                else{
                  palestrantes += p.nome;
                }              
              });
  
              this.email.mensagem += `<strong>${e.titulo}</strong><br />${e.descricao}<br />${e.dataHora}<br />${palestrantes}<br /><br />`;
              //console.log(palestrantes);
            });
  
            this.email.mensagem += `<br/><br/>
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
          }
  
          return console.log('RetornoInscricao', this.RetornoInscricao);
  
        },
        error => {
          return console.log(error);
        },
        () => {
          console.log('completou retornoPagamento');
          this.spinner.hide();
        }
      );
    }          
  }
}
