import { state } from "../../state";

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
      min-height: 80vh;
      width: 90%;
      background: #ffffff24;
      margin: 5vh auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }

    .fullname-container, .password-container{
        display: flex;
        flex-direction: column;
    }
    
    input{
      width: 300px;
      height: 40px;
      border-radius: 5px;
      border: none;
    }

    `;

    this.shadow.appendChild(style);
  }

  listenState() {
    const cs = state.getState();
    this.fullname = cs.fullname;
    this.render();
  }

  connectedCallback() {
    state.subscribe(() => {
      this.listenState();
    });
    this.listenState();
  }
}

customElements.define("my-data-comp", MyData);
