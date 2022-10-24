import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export function initMapForReportComp(mapContainer) {
  const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

  mapboxgl.accessToken = MAPBOX_API_KEY;

  const map = new mapboxgl.Map({
    container: mapContainer,
    style: "mapbox://styles/polmur/cl8w32dh4001514oxqd9l8aop",
    center: [-71.2998992, -41.1237693], // starting position [lng, lat]
    zoom: 12,
    projection: "globe" as any,
  });

  map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
  });
}