import { Router } from "@vaadin/router";
import { state } from "../../state";

class ListButton extends HTMLElement {
  shadow: ShadowRoot;
  variant: string;
  route: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    const cs = state.getState();
    const style = document.createElement("style");
    this.variant = this.getAttribute("variant") || "default";
    this.route = this.getAttribute("route");
    this.shadow.innerHTML = `
        <button class="button ${this.variant}"></button>
        `;

    const button = this.shadow.querySelector(".button") as any;
    button.addEventListener("click", () => {
      if (this.route == "/signup") {
        Router.go("/signup");
      } else {
        cs.logged ? Router.go(this.route) : Router.go("/login");
      }
    });
    button.textContent = this.textContent || "ups!";

    style.innerHTML = `
          .button{
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
          }

          .default{
            background: rgb(0, 0, 0, 0);
          }

          .enfasis{
            background: var(--blue);    
          }

          .dark{
            background: black;
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
