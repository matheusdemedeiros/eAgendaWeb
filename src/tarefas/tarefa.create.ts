import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtDescricao: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;
  private rdbPrioridade: HTMLInputElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  gravarRegistros(): void {
    const novaTarefa = this.montarObjetoTarefa();

    this.repositorioTarefas.inserir(novaTarefa);

    this.redirecionarPaginaListagem();
  }

  private redirecionarPaginaListagem() {
    window.location.href = "tarefa.list.html";
  }

  private montarObjetoTarefa(): Tarefa {
    this.rdbPrioridade = document.querySelector(
      'input[type="radio"]:checked'
    ) as HTMLInputElement;

    const prioridade = this.rdbPrioridade.value as Prioridade;

    const novaTarefa = new Tarefa(this.txtDescricao.value, prioridade);

    return novaTarefa;
  }

  configurarElementos(): void {
    this.txtDescricao = document.getElementById(
      "txtDescricao"
    ) as HTMLInputElement;

    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt: any) => {
      this.gravarRegistros();
    });
  }
}
new TarefaPaginaCadastro(new TarefaRepositorioLocalStorage());
