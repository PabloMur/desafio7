import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class MapboxComp extends HTMLElement {
  constructor() {
    super();
  }
  render() {
    const style = document.createElement("style");

    this.innerHTML = `
    <div id='map'></div>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
        padding: 0;
        margin:0;
      }

      #map{
        height: 60vh;
        max-width: 80%;
        margin: 10vh  auto;
        border-radius: 25px;
        background:red; 
        padding: 50px;
      }
    `;

    this.appendChild(style);

    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    const mapContainer = this.querySelector("#map") as any;
    mapboxgl.accessToken = MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainer, // container ID
      style: "mapbox://styles/mapbox/outdoors-v11", // style URL
      center: [-58.3815704, -34.6037389], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: "globe" as any, // display the map as a 3D globe
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
    this.render();
  }
}

customElements.define("mapbox-comp", MapboxComp);
