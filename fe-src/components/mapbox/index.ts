import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

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
        height: 80vh;
        width: 100%;
        border-radius: 20px;
      }

      .mapboxgl-ctrl-geocoder--input{
        border-radius: 4px;
      }
    `;

    this.appendChild(style);

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

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        flipCoordinates: true,
      })
    );

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocate);

    map.addControl(new mapboxgl.NavigationControl());

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude + 200}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      const marker1 = new mapboxgl.Marker({
        color: "#0000ff",
        draggable: false,
      })
        .setLngLat([crd.longitude + 0.005, crd.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            "<custom-pet-card pet-name='Otto'></custom-pet-card>"
          )
        )
        .addTo(map);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
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
