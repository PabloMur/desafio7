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
      <div>
        <custom-button>Crear Cuenta</custom-button>
      </div>
      </form>
    `;

    style.innerHTML = `
      .form{
        background: var(--blue);
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
