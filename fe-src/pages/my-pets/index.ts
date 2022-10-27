class MyPets extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
      <custom-header></custom-header>
      <my-pets-container></my-pets-container>
      <custom-footer></custom-footer>
    `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("my-pets-page", MyPets);
