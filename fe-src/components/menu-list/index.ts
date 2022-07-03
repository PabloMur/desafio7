class MenuList extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
        <div class="links-container">
            <ul></ul>
        </div>
    `;
    style.innerHTML = `
        .links-container{
          position: absolute;
          top:0;
          left: 0;
          height: 100vh;
          width: 100%;
          background: red;
          transform: translateX(50px);
        }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define("menu-list", MenuList);
