import { IRepositorioSerializavel } from "../shared/repositorio-Serializavel.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Tarefa } from "./tarefa.model";

export class TarefaRepositorioLocalStorage
  implements IRepositorio<Tarefa>, IRepositorioSerializavel
{
  private readonly localStorage: Storage;
  private  tarefas: Tarefa[];

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

  editar(id: string, tarefa: Tarefa): void {
    let registro = this.selecionarPorId(id);
    if (registro) {
      registro.id = tarefa.id;
      registro.dataCriacao = tarefa.dataCriacao;
      registro.dataConclusao = tarefa.dataConclusao;
      registro.prioridade = tarefa.prioridade;
      registro.descricao = tarefa.descricao;
      this.gravar();
    }
  }

  selecionarTodos(): Tarefa[] {
    const dados = this.localStorage.getItem("tarefas");

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  }

  excluir(id: string) {
    this.tarefas = this.tarefas.filter(x=> x.id != id);

    // let index = -1;
    // for (let i = 0; i < this.tarefas.length; i++) {
    //   if (this.tarefas[i].id === id) {
    //     index = i;
    //     break;
    //   }
    // }
    // this.tarefas.splice(index, 1);
    this.gravar();
  }

  selecionarPorId(id: string): Tarefa | undefined {
    return this.tarefas.find((x) => x.id === id);
  }
}
