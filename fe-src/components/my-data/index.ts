import { state } from "../../state";

class MyData extends HTMLElement {
  shadow: ShadowRoot;
  fullname: string;
  email: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.fullname = "";
    this.email = "";
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
    <loading-comp class="dormido"></loading-comp>
    <div class="my-data-container">
        <custom-text variant="title">Mis Datos</custom-text>
        <form class="form">
          <div class="fullname-container">
            <label class="label">Nombre</label>
            <input type="text" name="fullname" class="fullname" required="required" value="${this.fullname}">
            <button class="button">Guardar Nombre</button> 
          </div>
        </form>
        <form class="password-form">
          <div class="password-container">
            <label>nueva contraseña</label>
            <input type="password" name="passuno"/>
            <label>repite la contraseña</label>
            <input type="password" name="passdos"/>
          </div>
          <button class="password-button">Modificar Contraseña</button>
        </form>
      </>`;

    style.innerHTML = `
    *{
        box-sizing: border-box;
    }

    .dormido{
        display:none;
    }

    .despierto{
      display: inherit;
    }

    .my-data-container{
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

    .fullname-container, .password-container{
        display: flex;
        flex-direction: column;
    }
    
    input{
      width: 300px;
      height: 40px;
      border-radius: 5px;
      border: none;
      margin-top: 10px;
      box-shadow: 5px 5px 2px #00000017;
    }

    .button, .password-button{
      color: white;
      background: black;
      border: none;
      border-radius: 5px;
      min-width: 300px;
      height: 45px;
      margin-top: 10px;
      box-shadow: 5px 5px 2px #00000017;
    }

    label{
      margin-top: 5px;
      font-family: sans-serif;
      font-size: 20px;
    }

    `;

    this.shadow.appendChild(style);
  }

  listenState() {
    const cs = state.getState();
    this.fullname = cs.fullname;
    this.email = cs.email;
    this.render();
    const form = this.shadow.querySelector(".form");
    const passwordForm = this.shadow.querySelector(".password-form");
    const loading = this.shadow.querySelector("loading-comp");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      loading.classList.toggle("despierto");
      const target = e.target as any;
      const fullname = target.fullname.value;
      await state.UpdateUserName(fullname);
      loading.classList.toggle("despierto");
      state.setUserName(fullname);
    });

    passwordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loading.classList.toggle("despierto");
      const target = e.target as any;
      if (target.passuno.value === target.passdos.value) {
        await state.updateUserPassword(target.passuno.value);
        target.passuno.value = "";
        target.passdos.value = "";
        loading.classList.toggle("despierto");
      } else {
        alert("Las contraseñas deben ser iguales");
      }
    });
  }

  connectedCallback() {
    state.subscribe(() => {
      this.listenState();
    });
    this.listenState();
  }
}

customElements.define("my-data-comp", MyData);
