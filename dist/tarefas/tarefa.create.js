import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioTarefas) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
    }
    gravarRegistros() {
        const novaTarefa = this.montarObjetoTarefa();
        this.repositorioTarefas.inserir(novaTarefa);
        this.redirecionarPaginaListagem();
    }
    redirecionarPaginaListagem() {
        window.location.href = "tarefa.list.html";
    }
    montarObjetoTarefa() {
        this.rdbPrioridade = document.querySelector('input[type="radio"]:checked');
        const prioridade = this.rdbPrioridade.value;
        const novaTarefa = new Tarefa(this.txtDescricao.value, prioridade);
        return novaTarefa;
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => {
            this.gravarRegistros();
        });
    }
}
new TarefaPaginaCadastro(new TarefaRepositorioLocalStorage());
