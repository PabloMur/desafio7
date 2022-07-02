class PetsAround extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
            <custom-header></custom-header>
            <p>Mascotas cerca</p>
        `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("pets-around", PetsAround);
