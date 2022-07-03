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
            <custom-burger class="burger"></custom-burger>
          </haeder>
      `;
    const style = document.createElement("style");
    style.innerHTML = `
    header{
        background: var(--purple);
        height: 11vh;
        width: 85%;
        border-radius: 5px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        margin: 2vh auto;
      }
      `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
    const burger = this.shadow.querySelector("custom-burger") as any;

    burger.addEventListener("click", () => {
      console.log("hola");
    });
  }
}

customElements.define("custom-header", Header);
