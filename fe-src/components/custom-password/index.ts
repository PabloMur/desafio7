import { state } from "../../state";
import { Router } from "@vaadin/router";

class PasswordComp extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <div class="form-container">
        <loading-comp class="dormido"></loading-comp>
        <form class="form">
          <div class="input-container">
            <label class="label">Ingresa tu contraseña</label>
            <input type="password" name="password" class="input" required="required">
          </div>
          <button class="form-button">Comenzar</button> 
        </form>
      </>
      `;

    style.innerHTML = `
    .dormido{
      display:none;
    }

    .depierto{
      display: inherit;
    }

    .form-container{
      height: 70vh;
      width: 100%;
      margin: 0 auto;
    }

    @media(max-width:600px){
      .form-container{
        max-width: 90vw;
        margin: 0 5vw;
        overflow: hidden;
        height: 50vh;
      }
    }

    .form{
      height: 100%;
      width: 400px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
    } 
    @media(max-width: 600px){
      .form{
        width: 90vw;
      }
    }

    .input-container{
      width: 100%;
      margin: 20px auto 0 auto;
      animation: lower .4s ease;
    }

    .input{
      width: 99%;
      height: 50px;
      color: white;
      font-size: 20px;
      background: var(--orange);
      border:none;
      border-radius: 4px;
      text-align: center;
      margin: 0 auto;
      box-shadow: 5px 5px 2px #c7c7c7;
    }

    @media(max-width: 600px){
      .input-container{
        width: 90vw;
      }
    }

    label{
      margin: 10px;
      font-size: 20px;
      font-family: sans-serif;
      
    }
    button {
      font-size: 18px;
      border-radius: 4px;
      padding: 17px 13px;
      background-color: black;
      color: #D8FCFC;
      width: 400px;
      border-radius: 4px;
      animation: lower .4s ease;
      margin: 20px auto 0 auto;
      border: none;
      box-shadow: 5px 5px 2px #c7c7c7;
    }
    
    @media(max-width: 600px) {
      button {
        width: 90vw;
      }
    }
    
    @keyframes lower {
      0% {
        transform: translateY(100%);
      }
    
      75% {
        transform: translateY(-10%);
      }
    
      100% {
        transform: translateY(0%);
      }
    }

    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
    const form = this.shadow.querySelector(".form");
    const loading = this.shadow.querySelector("loading-comp");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      const email = target.email.value;
      state.setUserEmail(email);
      const check = await state.checkEmail();
      console.log(check);
      check ? Router.go("/password") : Router.go("/signup");
    });
  }
}

customElements.define("password-comp", PasswordComp);
