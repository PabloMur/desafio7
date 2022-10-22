import { initMapForReportComp } from "../../assets/mapForReport";
import { initDropzone } from "../../assets/dropzone";
import { state } from "../../state";

class ReportMaker extends HTMLElement {
  email: string;
  constructor() {
    super();
  }
  initMap() {
    initMapForReportComp(this.querySelector("#map") as any);
  }
  initDropzonefromAssets() {
    initDropzone();
  }
  render() {
    const cs = state.getState();
    if (cs.email) {
      this.email = cs.email;
    }
    const style = document.createElement("style");

    this.innerHTML = `
      <div class="container">
        <custom-text variant="title">Reportar una mascota</custom-text>

        <form class="form">
        <label>
            <p>Nombre de la mascota</p>
            <input name="pet-name" type="text" requiere="require">
        </label>
        <label>
            <p>imagen</p>
            <div class="pet-image-container">
              <div class="pet-image-container-text"> Haz click aqui o <br/>arrastra una imagen de tu mascota! </div>
            </div>
            <div class="line"></div>
        </label>
        <label class="last-pet-zone">
            <p>Zona en la que se perdió</p>
            <div class="pet-zone-container" id="map"></div>
            <label class="label-pet-zone"for="pet-zone">Ultima ubicación</label>
            <input name="pet-zone" type="text" requiere="require">
            <p>Buscá un punto de referencia para reportar a tu mascota.</br> Puede ser una dirección, un barrio o una ciudad.</p>
        </label>
    
        <button>Reportar como perdido</button>
        <button class="cancel-button">Cancelar Report</button>
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
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: var(--purple);
        box-shadow: 5px 5px 2px #00000017;
        border-radius: 20px;
        padding: 20px;
      }

      .pet-image-container-text{
        border: 2px dashed #8f8f8f;
        min-height: 44vh;
        width: 90%;
        display:flex;
        justify-content: center;
        align-items: center; 
        border-radius: 4px;
        position: relative;
        color:#8f8f8f;
      }

      .pet-image-container,
      .pet-zone-container{
        min-height: 50vh;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        background: #ffe5b5;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #00000017;
      }

      .pet-zone-container{
        padding: 40px;
      }

      .pet-image-container{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .last-pet-zone{
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .line{
        height: 1px;
        width: 100%;
        background: #5b00edcd;
        margin: 5vh auto;
      }

      .label-pet-zone{
        margin-top: 12px;
      }

      input{
        border: 1px solid black;
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
      .dz-size,.dz-filename,.dz-success-mark,.dz-error-mark{
        display:none;
      }

      .dz-preview dz-image-preview{
        position: absolute;
        top: 0;
      }

      .cancel-button{
        background: #c50000;
      }
    `;
    this.initMap();
    this.initDropzonefromAssets();
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
    const form = this.querySelector(".form");
    const clearButton = this.querySelector(".cancel-button");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("hola");
    });

    clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("cancelando operacion");
    });
  }
}

customElements.define("report-maker", ReportMaker);
