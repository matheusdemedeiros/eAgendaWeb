import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository-local-storage.js";

class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;
  private idSelecionado: string;

  constructor(private repositorioContatos: IRepositorio<Contato>, id?: string) {
    this.configurarElementos();

    if (id) {
      this.idSelecionado = id;
      const tarefaSelecionada = this.repositorioContatos.selecionarPorId(
        this.idSelecionado
      );

      if (tarefaSelecionada) this.preencherFormulario(tarefaSelecionada);
    }
  }

  gravarRegistros(): void {
    const contato = this.montarObjetoContato();

    if (!this.idSelecionado) {
      this.repositorioContatos.inserir(contato);
    } else {
      this.repositorioContatos.editar(this.idSelecionado, contato);
    }
    this.redirecionarPaginaListagem();
  }

  private montarObjetoContato(): Contato {
    const nome = this.txtNome.value;
    const email = this.txtEmail.value;
    const telefone = this.txtTelefone.value;
    const empresa = this.txtEmpresa.value;
    const cargo = this.txtCargo.value;
    let contato;

    if (!this.idSelecionado) {
      if (empresa && cargo) {
        contato = new Contato(nome, email, telefone, empresa, cargo);
      } else {
        contato = new Contato(nome, email, telefone);
      }
    } else {
      if (empresa && cargo) {
        contato = new Contato(
          nome,
          email,
          telefone,
          empresa,
          cargo,
          this.idSelecionado
        );
      } else {
        contato = new Contato(nome, email, telefone, undefined,undefined, this.idSelecionado);
      }
    }
    return contato;
  }

  private preencherFormulario(contato: Contato): void {
    this.txtNome.value = contato.nome;
    this.txtEmail.value = contato.email;
    this.txtTelefone.value = contato.telefone;
    if (contato.empresa) {
      this.txtEmpresa.value = contato.empresa;
    }
    if (contato.cargo) {
      this.txtCargo.value = contato.cargo;
    }
  }

  private redirecionarPaginaListagem() {
    window.location.href = "contato.list.html";
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
    this.txtTelefone = document.getElementById(
      "txtTelefone"
    ) as HTMLInputElement;
    this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;

    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt: any) => {
      this.gravarRegistros();
    });
  }
}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TarefaPaginaCadastro(new ContatoRepositorioLocalStorage(), id);
