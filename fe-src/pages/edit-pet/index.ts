class EditPetPage extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    this.innerHTML = `
                <custom-header></custom-header>
                <pet-editor></pet-editor>
                <report-maker></report-maker>
                <custom-footer></custom-footer>
            `;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("edit-pet-page", EditPetPage);
