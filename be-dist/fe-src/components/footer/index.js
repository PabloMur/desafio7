class Footer extends HTMLElement {
    shadow;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    render() {
        this.shadow.innerHTML = `
            <footer>
              <p>Footer</p>
            </footer>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
      footer{
          background: black;
          height: 30vh;
          width: 100%;
          display:flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }
        `;
        this.shadow.appendChild(style);
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define("custom-footer", Footer);
