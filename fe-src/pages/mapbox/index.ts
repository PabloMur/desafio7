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
       .container{
        width: 90%;
        height: 80vh;
        background: pink;
        margin: 5vh auto;
        border-radius: 20px;
       }
        `;
    this.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("mapbox-page", Mapbox);
