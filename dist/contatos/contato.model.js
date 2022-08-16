import { EntidadeBase } from "../shared/entidadeBase.model.js";
export class Contato extends EntidadeBase {
    constructor(nome, email, telefone, empresa, cargo, id) {
        super();
        if (id) {
            this.id = id;
        }
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        if (empresa) {
            this.empresa = empresa;
        }
        if (cargo) {
            this.cargo = cargo;
        }
    }
}
