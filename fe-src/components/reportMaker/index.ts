import { initMapForReportComp } from "../../assets/mapForReport";
import { initDropzone } from "../../assets/dropzone";
import { state } from "../../state";

class ReportMaker extends HTMLElement {
  file: any;
  petLatitude: any;
  petLongitude: any;
  map: any;
  constructor() {
    super();
    this.file = null;
    this.map = null;
  }
  initMap() {
    const cs = state.getState();
    const lng = cs.lng;
    const lat = cs.lat;
    this.map = initMapForReportComp(
      this.querySelector("#map" as any),
      lat,
      lng
    );
  }
  initDropzonefromAssets() {
    const myDropzone = initDropzone();
    myDropzone.on("thumbnail", (file) => (this.file = file));
  }

  render() {
    const style = document.createElement("style");

    this.innerHTML = `
      <div class="container">
        <custom-text variant="title">Reportar una mascota</custom-text>

        <form id="pet-zone-location__form">
          <label class="last-pet-zone">
            <custom-text>Zona en la que se perdió</custom-text>
            <div class="pet-zone-container" id="map"></div>
            <p>Buscá un punto de referencia para reportar a tu mascota.</br> Puede ser una dirección, un barrio o una ciudad.</p>
            <div >
              <input class="petZona" name="petzone" type="text" requiere="require">
              <button class="buton-add-zone">Buscar</button>
            </div>
          </label>
        </form>

        <form class="form">
          <label>
            <custom-text>Nombre de la mascota</custom-text>
            <input name="petname" type="text" requiere="require">
          </label>
          <label>
            <custom-text>Imagen de tu mascota</custom-text>
            <div class="pet-image-container">
              <div class="pet-image-container-text"> Haz click aqui o <br/>arrastra una imagen de tu mascota! </div>
            </div>
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
        min-height: 80vh;
        padding: 10px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #f5b849;
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
        border: 1px solid black;
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

  addListeners() {
    this.render();
    const form = this.querySelector(".form");
    const clearButton = this.querySelector(".cancel-button");
    const zoneForm = this.querySelector("#pet-zone-location__form");

    zoneForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const zona = target.petzone.value;
      console.log(zona);
      console.log(this);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const petName = target.petname.value;
      console.log(petName);
      console.log(this.file.dataURL);
    });

    clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.reload();
    });
  }

  connectedCallback() {
    this.addListeners();
  }
}

customElements.define("report-maker", ReportMaker);
