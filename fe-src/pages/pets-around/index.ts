import { state } from "../../state";

class PetsAround extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
            <custom-header></custom-header>
            <div class="general-container">
            <custom-text variant="title">Mascotas Perdidas Cerca</custom-text>
            <div class="cards-container">
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
              <custom-pet-card profile-image="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></custom-pet-card>
            </div>
            </div>
            <custom-footer></custom-footer>
        `;
    style.innerHTML = `
      *{
        box-sizing: border-box;
      }

      .general-container{
        text-align: center;
      }

      .cards-container{
        min-height: 60vh;
        width: 80%;
        background: #ffffff24;
        margin: 5vh auto;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
      }
    `;

    this.shadow.appendChild(style);
  }
  async connectedCallback() {
    const cs = state.getState();
    await state.getPetsAround().then(() => {
      this.render();
    });
  }
}

customElements.define("pets-around", PetsAround);
