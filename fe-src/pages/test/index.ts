class Test extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
              <custom-header></custom-header>
              <my-pet-card></my-pet-card>
              <custom-footer></custom-footer>
          `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("test-page", Test);
