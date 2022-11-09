import { Router } from "@vaadin/router";
import { state } from "../../state";

class ListButton extends HTMLElement {
  shadow: ShadowRoot;
  variant: string;
  route: string;
  action: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    const cs = state.getState();
    const style = document.createElement("style");
    this.variant = this.getAttribute("variant") || "default";
    this.route = this.getAttribute("route");
    this.action = this.getAttribute("action");

    if (this.action && this.action == "login" && cs.logged) {
      console.log(this.action);
      this.variant = "escondido";
    }

    if (this.action && this.action == "signup" && cs.logged) {
      console.log(this.action);
      this.variant = "escondido";
    }

    if (this.action && this.action == "logout" && !cs.logged) {
      console.log(this.action);
      this.variant = "escondido";
    }

    this.shadow.innerHTML = `
        <button class="${this.variant}"></button>
        `;
    const button = this.shadow.querySelector("button") as any;
    button.addEventListener("click", () => {
      //si esta logueado vamos a la ruta que tiene guardado el button
      if (cs.logged) {
        state.navigationRoute(this.route);
        Router.go(this.route);
      }
      //sino, guardamos la ruta y nos logueamos, una vez logueados vamos a la ruta que corresponda
      else {
        state.navigationRoute(this.route);
        Router.go("/login");
      }
    });
    button.textContent = this.textContent || "ups!";

    style.innerHTML = `
          button{
            font-size: 18px;
            border-radius: 4px;
            padding: 7px;
            background-color:black;
            color:#D8FCFC;
            width: auto;
            border:none;
            border-radius: 8px;
            animation: lower .5s ease ;
            margin:5px;
            cursor:pointer;
          }
          .escondido{
            display: none;
          }

          .default{
            background: rgb(0, 0, 0, 0);
          }

          .enfasis{
            background: var(--blue);
            box-shadow: 5px 5px 2px #00000017;    
          }

          .dark{
            background: black;
            box-shadow: 5px 5px 2px #00000017;
          }

          .warning{
            background: #ff4c4c;
            box-shadow: 5px 5px 2px #00000017;
          }

          @media screen and (max-width: 600px){
            .root{
              min-width: 90%;
              margin:0 5vw;
            }
          }
          @keyframes lower{
            0%{
              opacity: 0;
            }
            100%{
              opacity: 1;
            }
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

customElements.define("list-button", ListButton);
