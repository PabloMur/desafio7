import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  shadow: ShadowRoot;
  bgImage: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.bgImage = require("url:../../assets/images/park.jpg");
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
        <custom-header></custom-header>
        <div class="home-conteiner">
          <custom-text variant="title">Mascotas Perdidas Cerca tuyo</custom-text>
          <custom-text>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</custom-text>
          <div class="button-container">
            <custom-button>Dar Mi Ubicacion</custom-button>
          </div>
        </div>
        <custom-footer></custom-footer>
    `;
    style.innerHTML = `
      .home-conteiner{
        background: var(--purple);
        height: 80vh;
        width: 90%;
        border-radius: 5px;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:center;
      }
      .button-container{
        display: flex;
        justify-content: center;
        align-items:center;
        background: var(--blue);
        height: 50%;
        width: 100%;
        border-radius: 100% 100% 0 0;
      }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
    const button = this.shadow.querySelector("custom-button");
    const geolocation = navigator.geolocation;
    button.addEventListener("click", () => {
      Router.go("/around");
      geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        const { latitude, longitude } = position.coords;
        console.table({ latitude, longitude });
      });
    });
  }
}

customElements.define("home-page", Home);
