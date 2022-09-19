import { state } from "../../state";

class MyPetsContainer extends HTMLElement {
  shadow: ShadowRoot;
  pets;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  getPets() {
    const cs = state.getState();

    const traerMascotas = async () => {
      const pets = await state.getUserPets();
      this.pets = pets.pets;
      this.render();
    };

    cs.logged ? traerMascotas() : console.log("no logged");
  }

  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
        <custom-text variant="title">Mis Mascotas</custom-text>
        <div class="container">
        ${this.pets.map((pet) => {
          return `<custom-pet-card profile-image="${pet.image}" pet-name="${pet.fullname}" pet-zone="${pet.zone}"></custom-pet-card>`;
        })}
        </div>
    `;

    style.innerHTML = `
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .container{
        min-height: 80vh;
        width: 90%;
        background: #ffffff24;
        margin: 5vh auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }
    
    .mascota{
        width: 300px;
        height: 15vh;
        background: purple;
    }
    
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.getPets();
  }
}

customElements.define("my-pets-container", MyPetsContainer);
