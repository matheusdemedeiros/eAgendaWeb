import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository-local-storage.js";
class TarefaPaginaCadastro {
    constructor(repositorioContatos, id) {
        this.repositorioContatos = repositorioContatos;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioContatos.selecionarPorId(this.idSelecionado);
            if (tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);
        }
    }
    gravarRegistros() {
        const contato = this.montarObjetoContato();
        if (!this.idSelecionado) {
            this.repositorioContatos.inserir(contato);
        }
        else {
            this.repositorioContatos.editar(this.idSelecionado, contato);
        }
        this.redirecionarPaginaListagem();
    }
    montarObjetoContato() {
        const nome = this.txtNome.value;
        const email = this.txtEmail.value;
        const telefone = this.txtTelefone.value;
        const empresa = this.txtEmpresa.value;
        const cargo = this.txtCargo.value;
        let contato;
        if (!this.idSelecionado) {
            if (empresa && cargo) {
                contato = new Contato(nome, email, telefone, empresa, cargo);
            }
            else {
                contato = new Contato(nome, email, telefone);
            }
        }
        else {
            if (empresa && cargo) {
                contato = new Contato(nome, email, telefone, empresa, cargo, this.idSelecionado);
            }
            else {
                contato = new Contato(nome, email, telefone, undefined, undefined, this.idSelecionado);
            }
        }
        return contato;
    }
    preencherFormulario(contato) {
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
    redirecionarPaginaListagem() {
        window.location.href = "contato.list.html";
    }
    configurarElementos() {
        this.txtNome = document.getElementById("txtNome");
        this.txtEmail = document.getElementById("txtEmail");
        this.txtTelefone = document.getElementById("txtTelefone");
        this.txtEmpresa = document.getElementById("txtEmpresa");
        this.txtCargo = document.getElementById("txtCargo");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => {
            this.gravarRegistros();
        });
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaPaginaCadastro(new ContatoRepositorioLocalStorage(), id);
