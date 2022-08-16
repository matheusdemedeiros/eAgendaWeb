import { ContatoRepositorioLocalStorage } from "./contato.repository-local-storage.js";
class ContatoPageList {
    constructor(repositorioContatos) {
        this.repositorioContatos = repositorioContatos;
        this.configurarElementos();
        this.atualizarTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
    atualizarTabela() {
        const contatos = this.repositorioContatos.selecionarTodos();
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
            let botaoEditar = document.createElement("button");
            botaoEditar.className = "btn btn-info";
            botaoEditar.innerText = "Editar";
            botaoEditar.addEventListener("click", () => {
                const idSelecionado = novaLinha.cells[0].innerText;
                window.location.href = "contato.create.html?id=" + idSelecionado;
            });
            celulaBotaoEditar.appendChild(botaoEditar);
            let celulaBotaoExcluir = novaLinha.insertCell();
            let botaoExcluir = document.createElement("button");
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
