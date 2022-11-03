import { state } from "../../state";
import { Router } from "@vaadin/router";
class CustomPopupPermissionLocation extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
    <div class="permission-container">
        <div class="permission__card">
          <p>Para continuar necesitamos que nos des tu consentimiento para obtener tu ubicacion</p>
          <div class="permission__button-container">
            <custom-button>Aceptar y continuar!</custom-button>
          </div>
        </div>
    </div>
    `;

    style.innerHTML = `
    *{
      box-sizing: border-box;
    }

    .permission-container{
      position: fixed;
      top:0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 20;
      background: #000000c7;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 5s linear 5s;
      border: 1px solid black;
      font-size: 22px;
    }

    .permission__card{
      background: var(--purple);
      max-width: 600px;
      padding: 20px;
      text-align: center;
      border-radius: 20px;
      animation-duration: .3s;
      animation-name: aparecer;
    }
    @media (max-width: 600px){
      .permission__card{
        width: 90%;
        color: black:
      }
    }

    @keyframes aparecer{
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
    const cs = state.getState();
    this.render();

    const buton = this.shadow.querySelector("custom-button") as any;
    buton.addEventListener("click", async () => {
      Router.go("/mapbox");
    });
  }
}

customElements.define(
  "custom-popup-permission-location",
  CustomPopupPermissionLocation
);
