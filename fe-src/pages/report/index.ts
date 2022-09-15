class Report extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
          <custom-header></custom-header>
          <report-maker></report-maker>
          <custom-test></custom-test>
          <custom-footer></custom-footer>
      `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("report-page", Report);
