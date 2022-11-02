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
        width:5vh;
        height: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: var(--blue);
        padding: 5px;
        border-radius: 5px;
      }
      .line{
        height: 15%;
        width: 100%;
        background: var(--main-bg-color);
        border-radius: 4px;
      }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
    const button = this.shadow.querySelector(".lines-container");
    button.addEventListener("click", () => {
      console.log("Sou la burguer");
    });
  }
}

customElements.define("custom-burger", Burger);
