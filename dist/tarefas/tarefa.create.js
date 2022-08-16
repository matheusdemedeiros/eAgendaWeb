import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioTarefas, id) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(this.idSelecionado);
            if (tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);
        }
    }
    gravarRegistros() {
        const tarefa = this.montarObjetoTarefa();
        if (!this.idSelecionado) {
            this.repositorioTarefas.inserir(tarefa);
        }
        else {
            this.repositorioTarefas.editar(this.idSelecionado, tarefa);
        }
        this.redirecionarPaginaListagem();
    }
    montarObjetoTarefa() {
        const descricao = this.txtDescricao.value;
        const prioridade = this.obterPrioridadeSelecionada();
        let tarefa;
        if (!this.idSelecionado) {
            tarefa = new Tarefa(descricao, prioridade);
        }
        else {
            let tarefaRetornada = this.repositorioTarefas.selecionarPorId(this.idSelecionado);
            tarefa = new Tarefa(descricao, prioridade, id, tarefaRetornada === null || tarefaRetornada === void 0 ? void 0 : tarefaRetornada.dataCriacao);
        }
        return tarefa;
    }
    preencherFormulario(tarefa) {
        this.txtDescricao.value = tarefa.descricao;
        switch (tarefa.prioridade) {
            case Prioridade.Baixa:
                this.rdbPrioridade = document.querySelector("input[value='Baixa']");
                break;
            case Prioridade.Media:
                this.rdbPrioridade = document.querySelector("input[value='Média']");
                break;
            case Prioridade.Alta:
                this.rdbPrioridade = document.querySelector("input[value='Alta']");
                break;
        }
        this.rdbPrioridade.checked = true;
    }
    redirecionarPaginaListagem() {
        window.location.href = "tarefa.list.html";
    }
    obterPrioridadeSelecionada() {
        this.rdbPrioridade = document.querySelector('input[type="radio"]:checked');
        const prioridade = this.rdbPrioridade.value;
        return prioridade;
    }
    configurarElementos() {
        this.txtDescricao = document.getElementById("txtDescricao");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => {
            this.gravarRegistros();
        });
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new TarefaRepositorioLocalStorage(), id);
