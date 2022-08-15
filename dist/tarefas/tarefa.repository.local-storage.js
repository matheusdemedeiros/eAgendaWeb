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
}
