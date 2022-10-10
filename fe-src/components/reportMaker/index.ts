import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { Dropzone } from "dropzone";
import { state } from "../../state";

console.log(Dropzone);

class ReportMaker extends HTMLElement {
  email: string;
  constructor() {
    super();
  }
  render() {
    const cs = state.getState();
    if (cs.email) {
      this.email = cs.email;
    }
    const style = document.createElement("style");

    this.innerHTML = `
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
            <div class="pet-zone-container" id="map"></div>
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
        box-shadow: 5px 5px 2px #00000017;
        border-radius: 20px;
        padding: 20px;
      }

      .pet-image-container,
      .pet-zone-container{
        min-height: 50vh;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        background: white;
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
      .dz-size{
        display:none;
      }
    `;

    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    const mapContainer = this.querySelector("#map") as any;

    mapboxgl.accessToken = MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainer, // container ID
      style: "mapbox://styles/polmur/cl8w32dh4001514oxqd9l8aop", // style URL
      center: [-71.2998992, -41.1237693], // starting position [lng, lat]
      zoom: 12, // starting zoom
      projection: "globe" as any, // display the map as a 3D globe
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
    const form = this.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("hola");
    });

    const myDropzone = new Dropzone(".pet-image-container", {
      url: "/falsa",
      autoProcessQueue: false,
      clickable: true,
      uploadMultiple: true,
    });

    myDropzone.on("addedfile", function (file) {
      // usando este evento pueden acceder al dataURL directamente
      console.log(file);
    });
  }
}

customElements.define("report-maker", ReportMaker);
