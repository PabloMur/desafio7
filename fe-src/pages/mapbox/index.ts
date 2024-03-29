class Mapbox extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    this.innerHTML = `
        <custom-header></custom-header>
        <custom-instructions></custom-instructions>
        <mapbox-comp></mapbox-comp>
        <custom-footer></custom-footer>
      `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("mapbox-page", Mapbox);
