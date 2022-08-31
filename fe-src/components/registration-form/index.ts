import { state } from "../../state";

class RegistrationForm extends HTMLElement {
  shadow: ShadowRoot;
  email: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.email = "";
  }
  render() {
    const cs = state.getState();
    if (cs.email) {
      this.email = cs.email;
    }
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <form class="form">
        <label>
          <p>Email</p>
          <input type="email" value="${this.email}">
        </label>
        <label>
          <p>Contraseña</p>
          <input type="password">
        </label>
        <label>
          <p>Repetir contraseña</p>
          <input type="password">
      </label>
      
        <button>Crear Cuenta</button>
    
      </form>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
      }

      .form{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      input{
        border: none;
        width: 400px;
        background: var(--purple);
        height: 50px;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #c7c7c7;
        padding: 5px;
        font-size: 20px;
      }

      button{
        margin-top: 20px;
        width: 400px;
        height: 50px;
        border-radius: 5px;
        background: black;
        color: white;
        border: none;
        font-size: 20px;
        box-shadow: 5px 5px 2px #c7c7c7;
      }
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    state.subscribe(() => {
      this.render();
    });
    this.render();
  }
}

customElements.define("custom-registration-form", RegistrationForm);
