class Signup extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
            <custom-header></custom-header>
            <custom-registration-form></custom-registration-form>
            <custom-footer></custom-footer>
        `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("signup-page", Signup);
