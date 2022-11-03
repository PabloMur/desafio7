import { state } from "../../state";
import { Router } from "@vaadin/router";

class LoginComp extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <loading-comp class="dormido"></loading-comp>
      <div class="form-container">
        <form class="form">
          <div class="input-container">
            <label class="label">Ingresa Tu Email</label>
            <input type="email" name="email" class="input" required="required">
          </div>
          <button class="form-button">Comenzar</button> 
        </form>
      </>
      `;

    style.innerHTML = `
    .dormido{
      display:none;
    }

    .despierto{
      display: inherit;
    }

    .form-container{
      height: 70vh;
      width: 100%;
      margin: 0 auto;
    }

    @media(max-width:600px){
      .form-container{
        width: 90%;
      }
    }

    .form{
      height: 100%;
      max-width: 400px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
    } 

    .input-container{
      width: 100%;
      margin: 20px auto 0 auto;
      animation: lower .4s ease;
    }
    @media(max-width: 600px){
      .input-container{
        width: 100%;  
      }
    }

    .input{
      width: 90%;
      height: 50px;
      color: white;
      font-size: 20px;
      background: #9933ff;
      border:none;
      border-radius: 4px;
      text-align: center;
      margin: 0 auto;
      box-shadow: 5px 5px 2px #c7c7c7;
    }

    @media(max-width: 600px){
      .input{
        width: 99%;  
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
      max-width: 400px;
      border-radius: 4px;
      animation: lower .4s ease;
      margin: 20px auto 0 auto;
      border: none;
      box-shadow: 5px 5px 2px #c7c7c7;
    }
    
    @media(max-width: 600px) {
      button {
        width: 100%;
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
      loading.classList.toggle("despierto");

      const target = e.target as any;
      const email = target.email.value;
      state.setUserEmail(email);
      const check = await state.checkEmail();

      loading.classList.toggle("despierto");
      check ? Router.go("/password") : Router.go("/signup");
    });
  }
}

customElements.define("custom-login-email-input-form", LoginComp);
