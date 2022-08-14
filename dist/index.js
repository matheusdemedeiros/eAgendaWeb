class Index {
    constructor() {
        this.configurarElementos();
    }
    configurarElementos() {
        this.btnCadastro = document.getElementById("btnCadastro");
        this.btnCadastro.addEventListener("click", () => console.log("Clicado"));
    }
}
new Index();
export {};
