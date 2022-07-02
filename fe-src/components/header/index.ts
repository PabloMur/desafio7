class Header extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
          <header>
            <custom-logo></custom-logo>
            <custom-burger></custom-burger>
          </haeder>
      `;
    const style = document.createElement("style");
    style.innerHTML = `
    header{
        background: #FF66D8;
        height: 11vh;
        width: 85%;
        border-radius: 5px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        margin: 0 auto;
      }
      `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("custom-header", Header);
