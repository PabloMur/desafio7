import { Router } from "@vaadin/router";
import { state } from "../../state";

class PetInfoSender extends HTMLElement {
  shadow: ShadowRoot;
  reportData: any;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.reportData = null;
  }
  render() {
    const cs = state.getState();
    this.reportData = cs.report;
    console.log(this.reportData);

    const style = document.createElement("style");

    this.shadow.innerHTML = `
        <loading-comp class="dormido"></loading-comp>
        <div class="infosender-container">
        <custom-text varian="title">Repotar Informacion de ${this.reportData.value.petName}</custom-text>
          <form class="form">
              <label>
                <p>Tu nombre</p>
                <input type="text" name="informant-name" required>
              </label>
              <label>
                <p>Tu telefono</p>
                <input type="tel" required name="informant-phone-number">
              </label>
              <label>
                <p>Donde lo viste?</p>
                <textarea name="information"></textarea>
              </label>
              <button class="submit">Enviar</button>
            </form>
        </div>
    
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .dormido{
        display: none;
      }

      .despierto{
        display: inherit;
      }

      .infosender-container{
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
      .form{
        height: 65vh;
        width: 90%;
        gap: 10px;
        max-width: 400px;
        border-radius: 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      label{
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }
      input{
        border: none;
        width: 100%;
        margin: 0 auto;
        height: 50px;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #00000017;
        padding: 5px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      textarea{
        width: 100%;
        border-radius: 5px;
        margin: 0 auto;
        height: 100px;
        box-shadow: 5px 5px 2px #00000017;
      }

      .submit{
        background: black;
        color: white;
        width: 90%;
        padding: 10px;
        border: none;
        border-radius: 5px;
      }
    `;

    this.shadow.appendChild(style);
  }

  addlisteners() {
    this.render();
    const form = this.shadow.querySelector(".form");
    const loaderComp = this.shadow.querySelector("loading-comp");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      loaderComp.classList.toggle("despierto");

      const target = e.target as any;
      const informantName = target["informant-name"].value;
      const informantTel = target["informant-phone-number"].value;
      const information = target["information"].value;

      const mensaje = {
        to: this.reportData.value.ownerEmail,
        from: "pablomurillo.sp@gmail.com",
        subject: `Avistamiento de tu mascota: ${this.reportData.value.petName}!`,
        text: "and",
        html: `<strong>Hola! Quizas tengamos buenas noticias acerca de ${this.reportData.value.petName}!!
              <br>Ya que ${informantName}, tiene informacion de tu mascota.
              <br>Te ha dejado este mensaje: "...${information}...".
              <br>Y aqui esta su telefono para que puedas comunicarte: ${informantTel} 
              </strong>`,
      };

      await state.sendEmail(mensaje);
      loaderComp.classList.toggle("despierto");
      alert(
        `Gracias, mensaje enviado al Dueño de ${this.reportData.value.petName}`
      );
      Router.go("/");
    });
  }
  connectedCallback() {
    this.addlisteners();
  }
}

customElements.define("pet-info-sender", PetInfoSender);
