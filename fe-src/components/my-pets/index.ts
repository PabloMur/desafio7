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

    if (cs.logged) traerMascotas();
  }

  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
        <div class="container">
          <custom-text variant="title">Mis Mascotas</custom-text>
          <div class="pet-cards-container">
            ${this.pets
              .map((pet) => {
                return `<custom-pet-card profile-image="${pet.image}" pet-name="${pet.fullname}" pet-zone="${pet.zone}"></custom-pet-card>`;
              })
              .join("")}
          </div>
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }

    .pet-cards-container{
      max-width: 70%;
      display: flex;
      flex-wrap: wrap;
    }
    custom-pet-card{
      margin: 0 auto;
    }
    
    `;
    const test = this.shadow.querySelector(".container");

    test.addEventListener("report", (e: any) => {
      console.log(e.detail.petName);
    });

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.getPets();
  }
}

customElements.define("my-pets-container", MyPetsContainer);
