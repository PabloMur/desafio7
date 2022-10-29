import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

export function initMapForReportComp(mapContainer) {
  const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

  mapboxgl.accessToken = MAPBOX_API_KEY;

  const map = new mapboxgl.Map({
    container: mapContainer,
    style: "mapbox://styles/polmur/cl8w32dh4001514oxqd9l8aop",
    center: [-60.6305029, -32.9476597],
    zoom: 12,
    projection: "globe" as any,
  });

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    flipCoordinates: true,
  });

  geocoder.on("result", async () => {
    try {
      const { lat, lng } = geocoder.mapMarker._lngLat;

      console.log(lat, lng);
    } catch (error) {
      console.error(error);
    }
  });

  map.addControl(geocoder);

  map.on("style.load", () => {
    map.setFog({}); // Set the default atmosphere style
  });

  return map;
}
