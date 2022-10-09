import { state } from "../../state";

class ReportMaker extends HTMLElement {
  shadow: ShadowRoot;
  email: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.email = "";
  }
  render() {
    const cs = state.getState();
    if (cs.email) {
      this.email = cs.email;
    }
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <div class="container">
        <h2>Reportar una mascota</h2>

        <form class="form">
        <label>
            <p>Nombre de la mascota</p>
            <input name="pet-name" type="text" requiere="require">
        </label>
        <label>
            <p>imagen</p>
            <div class="pet-image-container"></div>
            <button>Agregar imagen de la mascota</button>
        </label>
        <label class="last-pet-zone">
            <p>Zona en la que se perdió</p>
            <div class="pet-zone-container"></div>
            <label class="label-pet-zone"for="pet-zone">Ultima ubicación</label>
            <input name="pet-zone" type="text" requiere="require">
            <p>Buscá un punto de referencia para reportar a tu mascota.</br> Puede ser una dirección, un barrio o una ciudad.</p>
        </label>
    
        <button>Reportar como perdido</button>
        <button>Cancelar</button>
        </form>
      </div>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
      }

      .container{
        min-height: 80vh;
        width: 90%;
        background: #ffffff24;
        margin: 5vh auto;
        padding: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        text-align: center;
        font-family: "Roboto", sans-serif;
      }

      .form{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--purple);
        border-radius: 20px;
        padding: 20px;
      }

      .pet-image-container,
      .pet-zone-container{
        min-height: 30vh;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        background: white;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #00000017;
      }
      
      .last-pet-zone{
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .label-pet-zone{
        margin-top: 12px;
      }

      input{
        border: none;
        width: 400px;
        height: 50px;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #00000017;
        padding: 5px;
        font-size: 20px;
      }

      button{
        margin-top: 20px;
        width: 400px;
        height: 50px;
        border-radius: 5px;
        background: black;
        color: white;
        border: none;
        font-size: 20px;
        box-shadow: 5px 5px 2px #00000017;
      }
    `;

    this.shadow.appendChild(style);
  }

  addListeners() {
    this.render();
    const form = this.shadow.querySelector(".form");
    const cs = state.getState();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const target = e.target as any;
      const passwordUno = target.password.value;
      const passwordDos = target["password-dos"].value;
      const email = target.email.value;
      const fullname = "User";
      const contraseñasIguales = passwordDos === passwordDos;
      console.log(email, fullname, passwordUno, passwordDos);

      contraseñasIguales
        ? await state.createUser(passwordUno, fullname)
        : console.log("algo fallo");
    });
  }

  connectedCallback() {
    state.subscribe(() => {
      this.addListeners();
    });
    this.addListeners();
  }
}

customElements.define("report-maker", ReportMaker);
