class Login extends HTMLElement {
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
                <custom-login-email-input-form></custom-login-email-input-form>
              </div>
              <custom-footer></custom-footer>
          `;
    style.innerHTML = `
        .registation-form-container{
          background:var(--white);
          height: 60vh;
          width: 60%;
          margin: 15vh auto;
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

customElements.define("login-page", Login);
