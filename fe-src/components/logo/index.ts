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
            <a class="anchor"href="/">
              <img src="${img}" alt="">
              <p class="ancor-name">Pet Finder</p>
            </a>
        </div>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
      .image-container{
        overflow:hidden;
        height: 9vh;
        width:100%;
        display: flex;
        align-items: center;
      }
      .anchor{
        display: flex;
        height: 6vh;
        align-items: center;
        text-decoration: none;
        color: black;  
      }
      .ancor-name{
        font-family: var(--font-family);
        color: var(--white);
        font weight: 700; 
        font-size: 1.5em;
        margin-left: 0.3em;
      }
      img{
        width: auto;
        height: 100%;
      }
        `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-logo", Logo);
