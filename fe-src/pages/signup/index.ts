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
        background: white;
        height: 70vh;
        width: 60%;
        margin: 10vh auto;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      }
    `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("signup-page", Signup);
