class EditPetPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
                <custom-header></custom-header>
                <edit-pet></edit-pet>
                <custom-footer></custom-footer>
            `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("edit-pet-page", EditPetPage);
