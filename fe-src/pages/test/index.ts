class Test extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
              <custom-header></custom-header>
              <pet-info-sender></pet-info-sender>
              <custom-footer></custom-footer>
          `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("test-page", Test);
