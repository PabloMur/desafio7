class Mapbox extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
                <custom-header></custom-header>
                <div class="container">
                  <p>Aca va a estar el mapa donde el user va a dar su ubicacion</p>   
                  <mapbox-comp></mapbox-comp>
                  <p>hola</p>
                </div>
                <custom-footer></custom-footer>
            `;
    style.innerHTML = `
          .registation-form-container{
            background:var(--white);
            height: 60vh;
            width: 60%;
            margin: 15vh auto;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("mapbox-page", Mapbox);
