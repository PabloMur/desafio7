class MyData extends HTMLElement {
  shadow: ShadowRoot;
  fullname: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.fullname = "";
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
    <div class="my-data-container">
        <loading-comp class="dormido"></loading-comp>
        <custom-text variant="title">Mis Datos</custom-text>
        <form class="form">
          <div class="fullname-container">
            <label class="label">Nombre</label>
            <input type="email" name="email" class="input" required="required" value="${this.fullname}">
          </div>
          <div class="password-container">
            <label>nueva contraseña</label>
            <input type="password">
            <label>repite la contraseña</label>
            <input type="password">
          </div>
          <custom-button>Guardar</custom-button> 
        </form>
      </>`;

    style.innerHTML = `
    *{
        box-sizing: border-box;
    }

    .dormido{
        display:none;
    }

    .my-data-container{
        background: purple;
        width: 50%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .fullname-container, .password-container{
        display: flex;
        flex-direction: column;
    }
    
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("my-data-comp", MyData);
