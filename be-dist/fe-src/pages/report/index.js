class Report extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    render() {
        this.shadow.innerHTML = `
          <custom-header></custom-header>
          <p> report Page</p>
      `;
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define("report-page", Report);
