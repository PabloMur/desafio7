class Signup extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");
    this.shadow.innerHTML = `
            <custom-header></custom-header>
            <div class="registation-form-container">
              <custom-registration-form></custom-registration-form>
            </div>
            <custom-footer></custom-footer>
        `;
    style.innerHTML = `
      .registation-form-container{
        background:var(--purple);
        height: 80vh;
        width: 90%;
        margin: 0 auto;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("signup-page", Signup);
