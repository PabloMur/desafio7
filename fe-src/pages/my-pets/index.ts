class MyPets extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <custom-header></custom-header>
    `;

    style.innerHTML = ``;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("my-pets-page", MyPets);
