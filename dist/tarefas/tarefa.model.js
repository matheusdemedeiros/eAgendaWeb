import { EntidadeBase } from "../shared/entidadeBase.model.js";
export class Tarefa extends EntidadeBase {
    constructor(descricao, prioridade, id, dataCriacao) {
        super();
        if (id) {
            this.id = id;
        }
        this.descricao = descricao;
        this.prioridade = prioridade;
        if (dataCriacao) {
            this.dataCriacao = dataCriacao;
        }
        else {
            this.dataCriacao = new Date();
        }
    }
}
