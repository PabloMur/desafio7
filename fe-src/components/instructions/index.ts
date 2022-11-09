class CustomInstructions extends HTMLElement {
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
          <p>Para buscar mascotas cerca, puedes usar el Boton de geolocalizacion o sino escribir una ubicaion en la search bar :3</p>
          <div class="permission__button-container">
            <custom-button>Perfectirijillo!</custom-button>
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
    this.render();
    const container = this.shadow.querySelector(".permission-container") as any;
    const buton = this.shadow.querySelector("custom-button") as any;
    buton.addEventListener("click", async () => {
      container.style.display = "none";
    });
  }
}

customElements.define("custom-instructions", CustomInstructions);
