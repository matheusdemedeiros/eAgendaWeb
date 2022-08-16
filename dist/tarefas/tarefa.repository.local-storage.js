export class TarefaRepositorioLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();
    }
    gravar() {
        const tarefasJsonString = JSON.stringify(this.tarefas);
        this.localStorage.setItem("tarefas", tarefasJsonString);
    }
    inserir(registro) {
        this.tarefas.push(registro);
        this.gravar();
    }
    editar(id, tarefa) {
        let registro = this.selecionarPorId(id);
        if (registro) {
            registro.id = tarefa.id;
            registro.dataCriacao = tarefa.dataCriacao;
            registro.dataConclusao = tarefa.dataConclusao;
            registro.prioridade = tarefa.prioridade;
            registro.descricao = tarefa.descricao;
            this.gravar();
        }
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("tarefas");
        if (!dados) {
            return [];
        }
        return JSON.parse(dados);
    }
    excluir(id) {
        // let index = this.tarefas.findIndex((tarefa:Tarefa) => {tarefa.id === id});
        let index = -1;
        for (let i = 0; i < this.tarefas.length; i++) {
            if (this.tarefas[i].id === id) {
                index = i;
                break;
            }
        }
        this.tarefas.splice(index, 1);
        this.gravar();
    }
    selecionarPorId(id) {
        return this.tarefas.find((x) => x.id === id);
    }
}
