import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class MapboxComp extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  render() {
    const style = document.createElement("style");

    this.shadow.innerHTML = `
      <div id="map"></div>
    `;

    style.innerHTML = `
      #map{
        height: 60vh;
        max-width: 80%;
        margin: 0 auto;
        border-radius: 25px;
      }

    `;

    this.shadow.appendChild(style);
  }

  addMap() {
    this.render();
    const mapContainer = this.shadow.querySelector("#map");

    mapboxgl.accessToken =
      "pk.eyJ1IjoicG9sbXVyIiwiYSI6ImNsNHd1ZnN1eDAxODkzZW8xMzBqYWtoZmQifQ.J77fA0creIqgIqJKRW6HWg";

    const map = new mapboxgl.Map({
      container: mapContainer, // container ID
      style: "mapbox://styles/mapbox/outdoors-v11", // style URL
      center: [-58.3815704, -34.6037389], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });
  }

  connectedCallback() {
    this.addMap();
  }
}

customElements.define("mapbox-comp", MapboxComp);
