class Burger extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
        <div class="lines-container">   
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
    `;
    style.innerHTML = `
      .lines-container{
        width:7vh;
        height: 7vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .line{
        height: 20%;
        width: 100%;
        background: blue;
        border-radius: 4px;
      }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-burger", Burger);
