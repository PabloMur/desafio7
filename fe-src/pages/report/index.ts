class Report extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
          <custom-header></custom-header>
          <custom-footer></custom-footer>
      `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("report-page", Report);
