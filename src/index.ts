import { IPaginaHTML } from "./shared/pagina.interface.js";

class Index implements IPaginaHTML {
  btnCadastro: HTMLButtonElement;

  constructor() {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.btnCadastro = document.getElementById(
      "btnCadastro"
    ) as HTMLButtonElement;

    this.btnCadastro.addEventListener("click", () =>
      console.log("Clicado")
    );
  }
}

new Index();
