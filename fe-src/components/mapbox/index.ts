import { Router } from "@vaadin/router";
import mapboxgl from "mapbox-gl";
import { state } from "../../state";

import {
  createMap,
  initGeocoder,
  initGeolocate,
  getAndSetPetsinToMap,
} from "../../assets/mapForPetsAround";

class MapboxComp extends HTMLElement {
  pets: any;
  constructor() {
    super();
    this.pets = [];
  }

  async initMap() {
    const cs = state.getState();
    const mapContainer = this.querySelector("#map") as any;
    const map = await createMap(mapContainer, cs.lat, cs.lng);

    const geocoder = await initGeocoder();

    geocoder.on("result", async () => {
      try {
        const provider = await geocoder.mapMarker._lngLat;
        await getAndSetPetsinToMap(map, this.pets, provider);
      } catch (error) {
        console.error(error);
      }
    });

    const geolocate = await initGeolocate();

    geolocate.on("geolocate", async () => {
      try {
        const { latitude, longitude } = await geolocate._lastKnownPosition
          .coords;
        const provider = { lat: latitude, lng: longitude };
        await getAndSetPetsinToMap(map, this.pets, provider);
      } catch (error) {
        console.error(error);
      }
    });

    map.addControl(geocoder);
    map.addControl(geolocate);
    map.addControl(new mapboxgl.NavigationControl());

    map.on("style.load", () => {
      map.setFog({});
    });
  }

  render() {
    const style = document.createElement("style");

    this.innerHTML = `
    <div class="container">
      <div id='map'></div>
    </div>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
        padding: 0;
        margin:0;
      }

      .dormido{
        display:none;
      }

      .despierto{
        display: inherit;
      }

      .container{
        width: 90%;
        height: 80vh;
        background: pink;
        margin: 5vh auto;
        border-radius: 20px;
       }

      #map{
        height: 80vh;
        width: 100%;
        border-radius: 20px;
      }

      .mapboxgl-popup {
        max-width: 250px;
      }
      
      .mapboxgl-popup-content {
        background: transparent;
        padding: 0;
      }

      .profile-pic{
        width: auto;
        max-height: 30vh;
      }
    `;
    this.appendChild(style);
    this.initMap();
  }

  addListeners() {
    this.render();
    const container = this.querySelector(".container");
    container.addEventListener("report", async (e: any) => {
      state.dataForReport(e.detail);
      Router.go("/sighting");
    });
  }

  connectedCallback() {
    state.subscribe(() => {
      this.addListeners();
    });
    this.addListeners();
  }
}

customElements.define("mapbox-comp", MapboxComp);
