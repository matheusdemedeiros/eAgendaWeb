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
    this.obterIdSelecionadoTabela();
  }

  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;

  }

  atualizarTabela(): void {
    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
    const tarefas = this.repositorioTarefas.selecionarTodos();
    tarefas.forEach((tarefa) => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(tarefa).forEach((valor: any) => {
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

  obterIdSelecionadoTabela(): string {
    const linhas = this.tabela.rows;
    

    alert("teste");
    return "teste";
  }
}

new TarefaPageList(new TarefaRepositorioLocalStorage());
