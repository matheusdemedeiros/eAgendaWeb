export class ContatoRepositorioLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();
    }
    inserir(registro) {
        this.contatos.push(registro);
        this.gravar();
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("contatos");
        if (!dados) {
            return [];
        }
        return JSON.parse(dados);
    }
    selecionarPorId(id) {
        return this.contatos.find((x) => x.id === id);
    }
    excluir(id) {
        this.contatos = this.contatos.filter((x) => x.id != id);
    }
    editar(id, contato) {
        let registro = this.selecionarPorId(id);
        if (registro) {
            registro.id = contato.id;
            registro.nome = contato.nome;
            registro.email = contato.email;
            registro.telefone = contato.telefone;
            registro.empresa = contato.empresa;
            registro.cargo = contato.cargo;
            this.gravar();
        }
    }
    gravar() {
        const contatosJsonString = JSON.stringify(this.contatos);
        this.localStorage.setItem("contatos", contatosJsonString);
    }
}
