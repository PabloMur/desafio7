import { Router } from "@vaadin/router";

// <custom-text>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</custom-text>
//           <div class="button-container">
//             <custom-button>Dar Mi Ubicacion</custom-button>
//           </div>

class Home extends HTMLElement {
  shadow: ShadowRoot;
  bgImage: string;
  bannerImg: string;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.bgImage = require("url:../../assets/images/map.png");
    this.bannerImg = require("url:../../assets/images/park.jpg");
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
        <custom-header></custom-header>
        <div class="home-conteiner">
          <div class="title-container">
            <custom-text variant="title">Mascotas Perdidas Cerca Tuyo</custom-text>
            <custom-text>Con esta app vas a poder ayudar a mascotas a reencontrarse con su familia. Hecha un vistazo!</custom-text>
            <custom-button>Buscar Mascotas</custom-button>
          </div>
          <div class="banner-container">
          </div>
        </div>
        <custom-footer></custom-footer>
    `;
    style.innerHTML = `
      *{
        box-sizing: border-box;
      }
      .home-conteiner{
        background: var(--white);
        height: 80vh;
        width: 90%;
        border-radius: 30px;
        margin: 2vh auto 6vh auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display:flex;
        justify-content: space-between;
        align-items:flex-end;
        overflow: hidden;
      }

      @media (max-width: 600px){
        .home-conteiner{
          flex-direction:column;
          overflow: none;
        }
      }

      .title-container{
        height: 100%;
        width: 60%;
        padding: 30px;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: space-around;
      }

      .banner-container{
        background:var(--white);
        height:100%;
        width:40%;
        padding: 30px;
        background-image: url(${this.bannerImg});
        background-size:cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius:30px;
        transition:all 5s ease 0s;
      }

      .button-container{
        display: flex;
        justify-content: center;
        align-items:center;
        background: var(--blue);
        height: 30%;
        width: 100%;
        border-radius: 50% 50% 0 0;
        background-image: url(${this.bgImage});
        background-size: cover;
      }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    // (async function () {
    //   await console.log("holas");
    //   const fetchedData = await fetch("http://localhost:3000/env", {
    //     method: "GET",
    //   });
    //   const response = await fetchedData.json();
    //   console.log(response);
    // })();

    this.render();
    const button = this.shadow.querySelector("custom-button");
    const geolocation = navigator.geolocation;
    button.addEventListener("click", () => {
      // Router.go("/around");
      // geolocation.getCurrentPosition((position) => {
      //   console.log(position.coords);
      //   const { latitude, longitude } = position.coords;
      //   console.table({ latitude, longitude });
      // });
    });
  }
}

customElements.define("home-page", Home);
