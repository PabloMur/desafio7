import { state } from "../../state";

class PetsAround extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    this.shadow.innerHTML = `
            <custom-header></custom-header>
            <custom-text>Mascotas Perdidas Cerca</custom-text>
            <div class="cards-container">
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
            </div>
            <custom-footer></custom-footer>
        `;
  }
  connectedCallback() {
    const cs = state.getState();
    this.render();
    console.log(`este es el state: ${JSON.stringify(cs)}`);
  }
}

customElements.define("pets-around", PetsAround);
