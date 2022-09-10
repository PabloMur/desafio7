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
          <input name="email" type="email" value="${this.email}">
        </label>
        <label>
          <p>Contraseña</p>
          <input name="password" type="password">
        </label>
        <label>
          <p>Repetir contraseña</p>
          <input name="password-dos" class="password" type="password">
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

  addListeners() {
    this.render();
    const form = this.shadow.querySelector(".form");
    const cs = state.getState();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const target = e.target as any;
      const passwordUno = target.password.value;
      const passwordDos = target["password-dos"].value;
      const email = target.email.value;
      const fullname = "User";
      const contraseñasIguales = passwordDos === passwordDos;
      console.log(email, fullname, passwordUno, passwordDos);

      contraseñasIguales
        ? await state.createUser(passwordUno, fullname)
        : console.log("algo fallo");
    });
  }

  connectedCallback() {
    state.subscribe(() => {
      this.addListeners();
    });
    this.addListeners();
  }
}

customElements.define("custom-registration-form", RegistrationForm);
