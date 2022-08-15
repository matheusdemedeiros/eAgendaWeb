import { IRepositorioSerializavel } from "../shared/repositorio-Serializavel.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./tarefa.model";

export class TarefaRepositorioLocalStorage
  implements IRepositorio<Tarefa>, IRepositorioSerializavel
{
  private readonly localStorage: Storage;
  private readonly tarefas: Tarefa[];

  constructor() {
    this.localStorage = window.localStorage;
    this.tarefas = this.selecionarTodos();
  }
  public gravar(): void {
    const tarefasJsonString = JSON.stringify(this.tarefas);
    this.localStorage.setItem("tarefas", tarefasJsonString);
  }

  inserir(registro: Tarefa): void {
    this.tarefas.push(registro);
    this.gravar();
  }

  selecionarTodos(): Tarefa[] {
    const dados = this.localStorage.getItem("tarefas");

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  }

  excluir(id: string) {
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
