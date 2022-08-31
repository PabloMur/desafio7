class Footer extends HTMLElement {
  shadow: ShadowRoot;
  img;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.img = require("../../assets/images/github.png");
  }
  render() {
    this.shadow.innerHTML = `
            <footer>
              <p>Follow me on: </p>
              </br>
              <a target="_black" href="https://github.com/PabloMur">
                <img src="${this.img}">
              </a>
            </footer>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
      footer{
          background: black;
          font-family: sans-serif;
          color: white;
          height: 30vh;
          width: 100%;
          display:flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }

        img{
          width: auto;
          height: 30px;
          margin: 10px;
        }
        `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-footer", Footer);
