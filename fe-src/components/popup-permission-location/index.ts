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
            <custom-button>Dar Mi Ubicacion</custom-button>
          </div>
        </div>
    </div>
    `;

    style.innerHTML = `
    *{
      box-sizing: border-box;
    }

    .permission-container{
      position: absolute;
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
    }

    .permission__card{
      background: var(--purple);
      max-width: 600px;
    }

    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
    const buton = this.shadow.querySelector("custom-button") as any;
    buton.addEventListener("click", () => {
      console.log("hola");
    });
  }
}

customElements.define(
  "custom-popup-permission-location",
  CustomPopupPermissionLocation
);
