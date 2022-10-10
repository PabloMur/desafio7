class Report extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    this.innerHTML = `
          <custom-header></custom-header>
          <report-maker></report-maker>
          <custom-footer></custom-footer>
      `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("report-page", Report);
