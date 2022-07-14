class CustomText extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    const variant = this.getAttribute("variant") || "body";
    const div = document.createElement("div");
    const style = document.createElement("style");

    style.innerHTML = `
          .title{
              font-size:50px;
              color: black;
              transition: all 3s ease;
              font-family: var(--font-family);
            }
            @media (max-width:600px){
              .title{
                width: 90%;
                font-size:40px;
                margin: 0 auto;
                text-align: center;
              }
            }
            .body{
              text-align:center;
              color: black;
              font-size: 25px;
              max-width: 600px;
              margin-bottom: 20px;
          }@media (max-width:600px){
            .body{
              width: 90%;
              margin: 0 auto;
            }
          }
        `;
    div.className = variant;
    div.textContent = this.textContent;
    this.shadow.appendChild(div);
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define("custom-text", CustomText);
