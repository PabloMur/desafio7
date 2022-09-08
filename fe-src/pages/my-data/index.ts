class MyDataPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
        <custom-header></custom-header>
        <div class="my-data_container">
          <my-data-comp></my-data-comp>
        </div>
        <custom-footer></custom-footer>
      `;

    style.innerHTML = `
    *{
      box-sizing: border-box;
    }
    .my-data_container{
      backdrop-filter: blur(10px);
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      height: 80vh;
      width: 90%;
      margin: 5vh auto;
      border-radius: 30px;
      padding: 30px;
    }
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("my-data-page", MyDataPage);
