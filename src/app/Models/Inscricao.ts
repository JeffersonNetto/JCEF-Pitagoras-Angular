import { Evento } from './Evento';
import { StatusPagamento } from './StatusPagamento';
import { Categoria } from './Categoria';

export class Inscricao {
  id: string;
  codigo: number;
  nome: string;
  cpf: string;
  telefone: string; 
  email: string;   
  categoria: Categoria = new Categoria();
  statusPagamento: StatusPagamento = new StatusPagamento();
  eventos: Evento[] = [];  
  paymentCode:string;
  transactionId:string;
  dataPagamento:string;
  urlPagSeguro:string;    
}

export class RetornoInscricao extends Inscricao{
  inscricao: Inscricao = new Inscricao();
  mensagem: string;
  sucesso:boolean;  
}