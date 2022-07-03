class RegistrationForm extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <form class="form">
        <label>
          <p>Email</p>
          <input type="email"></input>
        </label>
        <label>
          <p>Contraseña</p>
          <input type="password"></input>
        </label>
        <label>
          <p>Repetir contraseña</p>
          <input type="password"></input>
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
    this.render();
  }
}

customElements.define("custom-registration-form", RegistrationForm);
