class Mapbox extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    const style = document.createElement("style");
    this.innerHTML = `
                <custom-header></custom-header>
                <div class="container">   
                  <mapbox-comp></mapbox-comp>
                </div>
                <custom-footer></custom-footer>
            `;
    style.innerHTML = `
       
        `;
    this.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("mapbox-page", Mapbox);
