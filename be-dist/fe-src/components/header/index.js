class Header extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    render() {
        this.shadow.innerHTML = `
          <header>
            <div class="custom-menu-container">
              <custom-menu></custom-menu>
            </div>
          </haeder>
      `;
        const style = document.createElement("style");
        style.innerHTML = `
      header{
        height: 11vh;
        max-width: 100%;
      }
      .custom-menu-container{
        width: 90%;
      }
      `;
        this.shadow.appendChild(style);
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define("custom-header", Header);
