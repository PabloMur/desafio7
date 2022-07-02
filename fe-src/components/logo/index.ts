class Logo extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const img = require("url:../../assets/images/pata.svg");
    this.shadow.innerHTML = `
        <div class="image-container">
            <a href="/">
              <img src="${img}" alt="">
            </a>
        </div>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
      .image-container{
        background:red;
        overflow:hidden;
        height: 100%;
        width:100%;
      }
      img{
        width: 100%;
        height: auto;
      }
        `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-logo", Logo);
