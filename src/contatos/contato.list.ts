import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IPaginaListagem } from "../shared/pagina.list.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository-local-storage.js";

class ContatoPageList implements IPaginaHTML, IPaginaListagem {
  tabela: HTMLTableElement;

  constructor(private repositorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
    this.atualizarTabela();
  }

  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;
  }

  public atualizarTabela() {
    const contatos: Contato[] = this.repositorioContatos.selecionarTodos();

    let corpo = this.tabela.getElementsByTagName("tbody")[0];

    contatos.forEach((contato) => {
      let novaLinha = corpo.insertRow();

      let celulaId = novaLinha.insertCell();
      celulaId.innerText = contato.id.toString();
      celulaId.scope = "row";

      let celulaNome = novaLinha.insertCell();
      celulaNome.innerText = contato.nome;

      let celulaEmail = novaLinha.insertCell();
      celulaEmail.innerText = contato.email;

      let celulaTelefone = novaLinha.insertCell();
      celulaTelefone.innerText = contato.telefone;

      let celulaEmpresa = novaLinha.insertCell();
      if (contato.empresa) {
        celulaEmpresa.innerText = contato.empresa;
      }

      let celulaCargo = novaLinha.insertCell();
      if (contato.cargo) {
        celulaCargo.innerText = contato.cargo;
      }
      let celulaBotaoEditar = novaLinha.insertCell();

      let botaoEditar = document.createElement("button") as HTMLButtonElement;
      botaoEditar.className = "btn btn-info";
      botaoEditar.innerText = "Editar";
      botaoEditar.addEventListener("click", () => {
        const idSelecionado = novaLinha.cells[0].innerText;
        window.location.href = "contato.create.html?id=" + idSelecionado;
      });

      celulaBotaoEditar.appendChild(botaoEditar);

      let celulaBotaoExcluir = novaLinha.insertCell();

      let botaoExcluir = document.createElement("button") as HTMLButtonElement;
      botaoExcluir.classList.add("btn");
      botaoExcluir.classList.add("btn-danger");
      botaoExcluir.innerText = "Excluir";

      botaoExcluir.addEventListener("click", () => {
        const idSelecionado = novaLinha.cells[0].innerText;
        this.repositorioContatos.excluir(idSelecionado);
        window.location.reload();
      });

      celulaBotaoExcluir.appendChild(botaoExcluir);
    });
  }
}

new ContatoPageList(new ContatoRepositorioLocalStorage());
