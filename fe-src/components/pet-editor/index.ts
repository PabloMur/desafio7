import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

class PetEditor extends HTMLElement {
  constructor() {
    super();
  }
  async initMap() {
    this.render();
    const container = this.querySelector("#map");
    const map = new mapboxgl.Map({
      container: container as any, // container ID
      style: "mapbox://styles/polmur/cl8w32dh4001514oxqd9l8aop", // style URL
      center: [-57.560829, -37.995224], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });
    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });
  }

  render() {
    const style = document.createElement("style");

    this.innerHTML = `
      <div class="container">
        <custom-text variant="title">Editar Informacion de Mascota</custom-text>
          <label class="last-pet-zone">
            <custom-text>Zona en la que se perdió</custom-text>
            <p>Buscá un punto de referencia para reportar a tu mascota.</br> Puede ser una dirección, un barrio o una ciudad.</p>
            <div class="pet-zone-container" id="map"></div>
          </label>
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
    this.appendChild(style);
  }

  connectedCallback() {
    this.initMap();
  }
}

customElements.define("pet-editor", PetEditor);
