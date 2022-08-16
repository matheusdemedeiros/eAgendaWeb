import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";

export class ContatoRepositorioLocalStorage implements IRepositorio<Contato> {
  private readonly localStorage: Storage;
  private contatos: Contato[];

  constructor() {
    this.localStorage = window.localStorage;
    this.contatos = this.selecionarTodos();
  }

  inserir(registro: Contato): void {
    this.contatos.push(registro);
    this.gravar();
  }

  selecionarTodos(): Contato[] {
    const dados = this.localStorage.getItem("contatos");

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  }

  selecionarPorId(id: string): Contato | undefined {
    return this.contatos.find((x) => x.id === id);
  }

  excluir(id: string): void {
    this.contatos = this.contatos.filter((x) => x.id != id);
  }

  editar(id: string, contato: Contato): void {
    let registro = this.selecionarPorId(id);
    if (registro) {
      registro.id = contato.id;
      registro.nome = contato.nome;
      registro.email = contato.email;
      registro.telefone = contato.telefone;
      registro.empresa = contato.empresa;
      registro.cargo = contato.cargo;
      this.gravar();
    }
  }

  public gravar(): void {
    const contatosJsonString = JSON.stringify(this.contatos);
    this.localStorage.setItem("contatos", contatosJsonString);
  }
}
