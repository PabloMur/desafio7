import { Router } from "@vaadin/router";
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
      <loading-comp class="dormido"></loading-comp>
      <div class="registration-form-container">
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
      </div>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
      }

      .dormido{
        display:none;
      }
  
      .despierto{
        display: inherit;
      }
      
      .registration-form-container{
        background: white;
        height: 70vh;
        width: 60%;
        margin: 10vh auto;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      }
      @media(max-width:600px){
        .registration-form-container{
          height: 80vh;
          width: 90%;
          margin: 3vh auto; 
        }
      }

      .form{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      @media(max-width:600px){
        .form{
          max-width: 100%;
          padding: 0;
        }
      }

      input{
        border: none;
        max-width: 400px;
        background: var(--purple);
        height: 50px;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #c7c7c7;
        padding: 5px;
        font-size: 20px;
      }
      @media(max-width:600px){
        input{
          width: 100%;
        }
      }

      button{
        margin-top: 20px;
        max-width: 400px;
        height: 50px;
        border-radius: 5px;
        background: black;
        color: white;
        border: none;
        font-size: 20px;
        box-shadow: 5px 5px 2px #c7c7c7;
      }
      @media(max-width:600px){
        button{
          width: 100%;
        }
      }
    `;

    this.shadow.appendChild(style);
  }

  addListeners() {
    this.render();
    const form = this.shadow.querySelector(".form");
    const loading = this.shadow.querySelector("loading-comp");
    const cs = state.getState();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      loading.classList.toggle("despierto");
      const target = e.target as any;
      const passUno = target.password.value;
      const passDos = target["password-dos"].value;
      const fullname = "User";
      const passIguales = passDos === passDos;

      try {
        if (passIguales) {
          await state.createUser(passUno, fullname);
          await state.getToken(passUno);
          await state.getUserMe();
          loading.classList.toggle("despierto");
          Router.go(cs.route || "/");
        }
      } catch (error) {
        console.error(error);
      }
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
