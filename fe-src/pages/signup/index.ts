class Signup extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
            <custom-header></custom-header>
            <p>Registrate aca</p>
        `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("signup-page", Signup);
