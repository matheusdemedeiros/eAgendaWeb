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
  private idSelecionado: string;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>, id?: string) {
    this.configurarElementos();

    if (id) {
      this.idSelecionado = id;
      const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(
        this.idSelecionado
      );

      if (tarefaSelecionada) this.preencherFormulario(tarefaSelecionada);
    }
  }

  gravarRegistros(): void {
    const tarefa = this.montarObjetoTarefa();

    if (!this.idSelecionado) {
      this.repositorioTarefas.inserir(tarefa);
    } else {
      this.repositorioTarefas.editar(this.idSelecionado, tarefa);
    }
    this.redirecionarPaginaListagem();
  }

  private montarObjetoTarefa():Tarefa{
    const descricao = this.txtDescricao.value;
    const prioridade = this.obterPrioridadeSelecionada();
    let tarefa: Tarefa;
    if (!this.idSelecionado) {
      tarefa = new Tarefa(descricao, prioridade);
    }
    else{
      let tarefaRetornada = this.repositorioTarefas.selecionarPorId(this.idSelecionado);
      tarefa = new Tarefa(descricao, prioridade, id,tarefaRetornada?.dataCriacao);
    }
    return tarefa;
}

  private preencherFormulario(tarefa: Tarefa): void {
    this.txtDescricao.value = tarefa.descricao;
    switch (tarefa.prioridade) {
      case Prioridade.Baixa:
        this.rdbPrioridade = document.querySelector(
          "input[value='Baixa']"
        ) as HTMLInputElement;
        break;
      case Prioridade.Media:
        this.rdbPrioridade = document.querySelector(
          "input[value='Média']"
        ) as HTMLInputElement;
        break;
      case Prioridade.Alta:
        this.rdbPrioridade = document.querySelector(
          "input[value='Alta']"
        ) as HTMLInputElement;
        break;
    }
    this.rdbPrioridade.checked = true;
  }

  private redirecionarPaginaListagem() {
    window.location.href = "tarefa.list.html";
  }

  private obterPrioridadeSelecionada() {
    this.rdbPrioridade = document.querySelector(
      'input[type="radio"]:checked'
    ) as HTMLInputElement;

    const prioridade = this.rdbPrioridade.value as Prioridade;
    return prioridade;
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

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TarefaPaginaCadastro(new TarefaRepositorioLocalStorage(), id);
