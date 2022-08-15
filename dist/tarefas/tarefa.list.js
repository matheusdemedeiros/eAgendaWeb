import { TarefaRepositorioLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPageList {
    constructor(repositorioTarefas) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        this.atualizarTabela();
        this.obterIdSelecionadoTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
    atualizarTabela() {
        let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
        const tarefas = this.repositorioTarefas.selecionarTodos();
        tarefas.forEach((tarefa) => {
            const novaLinha = corpoTabela.insertRow();
            Object.values(tarefa).forEach((valor) => {
                const novaCelula = novaLinha.insertCell();
                novaCelula.innerText = valor;
            });
            const btnGroup = novaLinha.insertCell();
            btnGroup.innerHTML = `<div class="btn-group" role="group" aria-label="Basicexample">
     <button onclick="obterIdSelecionadoTabela" type="button" class="btn btn-outline-primary">
      <span class="material-icons">edit</span>
     </button>
     <button type="button onclick="obterIdSelecionadoTabela"" class="btn btn-outline-primary"><span class="material-icons">delete</span></button>
   </div>`;
        });
    }
    obterIdSelecionadoTabela() {
        const linhas = this.tabela.rows;
        alert("teste");
        return "teste";
    }
}
new TarefaPageList(new TarefaRepositorioLocalStorage());
