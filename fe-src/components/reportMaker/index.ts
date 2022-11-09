import { createMap, initGeocoder } from "../../assets/mapForPetsAround";
import { initDropzone } from "../../assets/dropzone";
import { state } from "../../state";
import { Router } from "@vaadin/router";

class ReportMaker extends HTMLElement {
  file: any;
  petLatitude: any;
  petLongitude: any;
  map: any;
  petZone: string;
  petStatus: string;
  petAge: number;
  constructor() {
    super();
    this.file = null;
    this.map = null;
  }
  async initMap() {
    const cs = state.getState();
    this.map = await createMap(
      this.querySelector("#map" as any),
      cs.lat,
      cs.lng
    );
    const geocoder = await initGeocoder();
    geocoder.on("result", async () => {
      try {
        const provider = await geocoder.mapMarker._lngLat;
        this.petLatitude = provider.lat;
        this.petLongitude = provider.lng;
        this.petZone = JSON.parse(geocoder.lastSelected).text;
        this.petStatus = "perdido";
      } catch (error) {
        console.error(error);
      }
    });
    this.map.addControl(geocoder);
  }

  initDropzonefromAssets() {
    const myDropzone = initDropzone();
    myDropzone.on("thumbnail", (file) => (this.file = file));
  }

  render() {
    const style = document.createElement("style");

    this.innerHTML = `
      <loading-comp class="dormido"></loading-comp>
      <div class="container">
        <custom-text variant="title">Reportar una mascota</custom-text>

        <form class="form">
          <label>
            <custom-text>Nombre de la mascota:</custom-text>
            <input name="petname" type="text" requiere="require">
          </label>
          <label>
            <custom-text>Imagen de tu mascota</custom-text>
            <div class="pet-image-container">
              <div class="pet-image-container-text"> Haz click aqui o <br/>arrastra una imagen de tu mascota! </div>
            </div>
          </label>
          <label class="last-pet-zone">
            <custom-text>Zona en la que se perdió</custom-text>
            <p>Buscá un punto de referencia para reportar a tu mascota.</br> Puede ser una dirección, un barrio o una ciudad.</p>
            <div class="pet-zone-container" id="map"></div>
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

      .dormido{
        display: none;
      }

      .despierto{
        display: inherit;
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
      
      @media (max-width: 600px){
        .form{
          min-width: 100%;
        }
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
        max-width: 400px;
        height: 50px;
        border-radius: 5px;
        box-shadow: 5px 5px 2px #00000017;
        padding: 5px;
        font-size: 20px;
      }

      button{
        margin-top: 20px;
        max-width: 400px;
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
    const loader = this.querySelector("loading-comp");
    const cs = state.getState();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      loader.classList.toggle("despierto");
      const target = e.target as any;
      const petName = target.petname.value;

      const pet = {
        fullname: petName,
        ownerEmail: cs.email,
        zone: this.petZone,
        lat: this.petLatitude,
        lng: this.petLongitude,
        state: this.petStatus,
        image: this.file.dataURL,
      };
      await state.reportUserPet(pet);
      loader.classList.toggle("despierto");
      Router.go("/my-pets");
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
