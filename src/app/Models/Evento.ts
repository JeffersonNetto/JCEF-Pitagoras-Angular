import { Palestrante } from './Palestrante';
import { TipoEvento } from './TipoEvento';

export class Evento {
        id: string;
        codigo: number;
        titulo: string;
        descricao: string;
        dataHora: string;
        diaDaSemana: number;
        tipoEvento: TipoEvento = new TipoEvento();
        palestrantes: Palestrante[] = [];
        qtdVagas:number;
        escolhido: boolean = false;
} 