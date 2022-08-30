import { state } from "../../state";

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
      <my-pets-container></my-pets-container>
      <loading-comp class="dormido"></loading-comp>
      <custom-footer></custom-footer>
    `;

    style.innerHTML = `
    .dormido{
      display: none;
    }
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("my-pets-page", MyPets);
