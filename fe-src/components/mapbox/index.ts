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
      <script>
        
      </script>
    `;

    style.innerHTML = ``;

    this.shadow.appendChild(style);
  }

  addMap() {
    this.render();
    const mapContainer = this.shadow.querySelector("#map");
    console.log(mapContainer);

    mapboxgl.accessToken =
      "pk.eyJ1IjoicG9sbXVyIiwiYSI6ImNsNHd1ZnN1eDAxODkzZW8xMzBqYWtoZmQifQ.J77fA0creIqgIqJKRW6HWg";

    const map = new mapboxgl.Map({
      container: mapContainer, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    console.log("pepito");
  }

  connectedCallback() {
    this.addMap();
  }
}

customElements.define("mapbox-comp", MapboxComp);
