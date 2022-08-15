import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IPaginaListagem } from "../shared/pagina.list.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPageList implements IPaginaHTML, IPaginaListagem {
  tabela: HTMLTableElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
    this.atualizarTabela();
  }
  
  obterIdSelecionadoTabela(): string {
    const linhas = this.tabela.rows;

    alert("teste");
    return "teste";
  }
  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;
  }

  public atualizarTabela() {
    const tarefas: Tarefa[] = this.repositorioTarefas.selecionarTodos();

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

      let botaoEditar = document.createElement("button") as HTMLButtonElement;
      botaoEditar.classList.add("btn");
      botaoEditar.classList.add("btn-info");
      botaoEditar.innerText = "Editar";
      botaoEditar.addEventListener("click", () => {
        window.location.href = "tarefa.edit.html?tarefa-id=" + tarefa.id;
      });

      celulaBotaoEditar.appendChild(botaoEditar);

      let celulaBotaoExcluir = novaLinha.insertCell();

      let botaoExcluir = document.createElement("button") as HTMLButtonElement;
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


  

  private shortDateString(data:Date) {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  // atualizarTabela(): void {
  //   let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
  //   const tarefas = this.repositorioTarefas.selecionarTodos();
  //   tarefas.forEach((tarefa) => {
  //     const novaLinha = corpoTabela.insertRow();

  //     Object.values(tarefa).forEach((valor: any) => {
  //       const novaCelula = novaLinha.insertCell();
  //       novaCelula.innerText = valor;
  //     });
  //     const btnGroup = novaLinha.insertCell();
  //     btnGroup.innerHTML = `<div class="btn-group" role="group" aria-label="Basicexample">
  //    <button onclick="obterIdSelecionadoTabela" type="button" class="btn btn-outline-primary">
  //     <span class="material-icons">edit</span>
  //    </button>
  //    <button type="button onclick="obterIdSelecionadoTabela" class="btn btn-outline-primary"><span class="material-icons">delete</span></button>
  //  </div>`;
  //   });
  // }
}

new TarefaPageList(new TarefaRepositorioLocalStorage());
