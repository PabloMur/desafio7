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
      background:var(--white);
      height: 85vh;
      width: 90%;
      margin: 0 auto;
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
