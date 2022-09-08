class Footer extends HTMLElement {
  shadow: ShadowRoot;
  github;
  linkedin;
  apx;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.github = require("../../assets/images/github.png");
    this.linkedin = require("../../assets/images/linkedin.png");
    this.apx = require("../../assets/images/apx.png");
  }
  render() {
    this.shadow.innerHTML = `
            <footer>
              <div class="container">
                <div class="find">
                  <p>Find me on:</p>
                  <a target="_black" href="https://github.com/PabloMur">
                    <img src="${this.github}">
                  </a>
                  <a target="_black" href="https://www.linkedin.com/in/pablo-nicol%C3%A1s-murillo-57034b189/">
                    <img src="${this.linkedin}">
                  </a>
                </div>
                <div class="learn">
                  <p>i learned this in: </p>
                  <a target="_black" href="https://apx.school/">
                    <img src="${this.apx}">
                  </a>
                </div>
              </div>
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

        .find,.learn{
          display: flex;
          align-items: center;
          justify-content: center;
        }

        `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-footer", Footer);
