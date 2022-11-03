class PasswordPage extends HTMLElement {
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
                  <password-comp></password-comp>
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
          @media(max-width:600px){
            .registation-form-container{
              width: 90%; 
            }
          }
        `;
    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("password-page", PasswordPage);
