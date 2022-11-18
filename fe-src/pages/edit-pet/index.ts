class EditPetPage extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    this.innerHTML = `
                <custom-header></custom-header>
                <pet-editor></pet-editor>
                <custom-footer></custom-footer>
            `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("edit-pet-page", EditPetPage);
