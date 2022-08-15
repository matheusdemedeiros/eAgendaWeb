import { TarefaRepositorioLocalStorage } from "./tarefa.repository.local-storage.js";
class TarefaPageList {
    constructor(repositorioTarefas) {
        this.repositorioTarefas = repositorioTarefas;
        this.configurarElementos();
        this.atualizarTabela();
    }
    obterIdSelecionadoTabela() {
        const linhas = this.tabela.rows;
        alert("teste");
        return "teste";
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
    atualizarTabela() {
        const tarefas = this.repositorioTarefas.selecionarTodos();
        let corpo = this.tabela.getElementsByTagName("tbody")[0];
        tarefas.forEach((tarefa) => {
            let novaLinha = corpo.insertRow();
            let celulaId = novaLinha.insertCell();
            celulaId.innerText = tarefa.id.toString();
            celulaId.scope = "row";
            let celulaDescricao = novaLinha.insertCell();
            celulaDescricao.innerText = tarefa.descricao;
            let celulaPrioridade = novaLinha.insertCell();
            celulaPrioridade.innerText = tarefa.prioridade;
            let dataFormatada = this.shortDateString(tarefa.dataCriacao);
            let celulaDataCriacao = novaLinha.insertCell();
            celulaDataCriacao.innerText = dataFormatada;
            let celulaBotaoEditar = novaLinha.insertCell();
            let botaoEditar = document.createElement("button");
            botaoEditar.classList.add("btn");
            botaoEditar.classList.add("btn-info");
            botaoEditar.innerText = "Editar";
            botaoEditar.addEventListener("click", () => {
                window.location.href = "tarefa.edit.html?tarefa-id=" + tarefa.id;
            });
            celulaBotaoEditar.appendChild(botaoEditar);
            let celulaBotaoExcluir = novaLinha.insertCell();
            let botaoExcluir = document.createElement("button");
            botaoExcluir.classList.add("btn");
            botaoExcluir.classList.add("btn-danger");
            botaoExcluir.innerText = "Excluir";
            botaoExcluir.addEventListener("click", (_ctx) => {
                this.repositorioTarefas.excluir(tarefa.id);
                //window.location.reload();
            });
            celulaBotaoExcluir.appendChild(botaoExcluir);
        });
    }
    shortDateString(data) {
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
}
new TarefaPageList(new TarefaRepositorioLocalStorage());
