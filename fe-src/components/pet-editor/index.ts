import { Router } from "@vaadin/router";
import { state } from "../../state";

class PetEditor extends HTMLElement {
  shadow: ShadowRoot;
  petName: string;
  petZone: string;
  constructor() {
    super();
    const cs = state.getState();
    this.shadow = this.attachShadow({ mode: "open" });
    this.petName = "";
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
        <div class="infosender-container">
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

      loaderComp.classList.toggle("despierto");

      Router.go("/");
    });
  }
  connectedCallback() {
    this.addlisteners();
  }
}

customElements.define("edit-pet", PetEditor);
