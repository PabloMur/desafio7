import { state } from "../../state";

class MyPets extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const traerMascotas = async () => {
      const pets = await state.getUserPets();
      console.log(pets.pets[0].fullname);
      console.log(typeof pets);
    };
    const cs = state.getState();
    cs.logged ? (console.log(true), traerMascotas()) : console.log(false);

    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <custom-header></custom-header>
      <div class="my-data_container">
        <p>Hola</p>
        <loading-comp class="dormido"></loading-comp>
      </div>
      <custom-footer></custom-footer>
    `;

    style.innerHTML = `
    .dormido{
      display: none;
    }
    `;

    this.shadow.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define("my-pets-page", MyPets);
