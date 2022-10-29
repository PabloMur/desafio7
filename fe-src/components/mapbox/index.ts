import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { state } from "../../state";

class MapboxComp extends HTMLElement {
  pets: any;
  constructor() {
    super();
    this.pets = null;
  }

  initMap() {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    const mapContainer = this.querySelector("#map") as any;
    mapboxgl.accessToken = MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainer, // container ID
      style: "mapbox://styles/polmur/cl8w32dh4001514oxqd9l8aop", // style URL
      center: [-57.549898, -38.0045147], // starting position [lng, lat]
      zoom: 12, // starting zoom
      projection: "globe" as any, // display the map as a 3D globe
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      flipCoordinates: true,
    });

    geocoder.on("result", async () => {
      try {
        const { lat, lng } = geocoder.mapMarker._lngLat;
        this.pets = await state.getPetsAround(lat, lng);
        console.log(this.pets);
      } catch (error) {
        console.error(error);
      }
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }) as any;

    geolocate.on("geolocate", async () => {
      const { latitude, longitude } = await geolocate._lastKnownPosition.coords;
      console.log(latitude);
      console.log(longitude);
      state.getPetsAround(latitude, longitude);
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
    <div id='map'></div>
    `;

    style.innerHTML = `
      *{
        box-sizing: border-box;
        padding: 0;
        margin:0;
      }

      #map{
        height: 80vh;
        width: 100%;
        border-radius: 20px;
      }
    `;

    this.initMap();
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("mapbox-comp", MapboxComp);

// para hacer un nuevo marker con coordinadas especificas deberia usar:
// const marker1 = new mapboxgl.Marker()
//          .setLngLat([12.554729, 55.70651])
//          .addTo(map);
