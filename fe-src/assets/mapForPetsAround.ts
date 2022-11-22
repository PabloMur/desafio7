import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { state } from "../state";

mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

export const createMap = async (mapContainer: any, lat, lng) => {
  try {
    const map = new mapboxgl.Map({
      container: mapContainer, // container ID
      style: "mapbox://styles/polmur/cl8w32dh4001514oxqd9l8aop", // style URL
      //center: [-57.560829, -37.995224], // starting position [lng, lat]
      center: [lng, lat], // starting position [lng, lat]
      zoom: 12, // starting zoom
      projection: "globe" as any, // display the map as a 3D globe
    });
    return map;
  } catch (error) {
    console.error(error);
  }
};

export const initGeocoder = async () => {
  try {
    return new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
  } catch (error) {
    console.error(error);
  }
};

export const initGeolocate = async () => {
  try {
    return new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }) as any;
  } catch (error) {
    console.error(error);
  }
};

export const putMarkers = async (map: any, pets: any) => {
  try {
    for (const petItem in pets.response) {
      const { image, fullname, zone, id, ownerEmail } = pets.response[petItem];
      const { lat, lng } = pets.response[petItem]._geoloc;
      console.log(pets.response[petItem]);
      new mapboxgl.Marker({
        color: "#FF0000",
      })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 10 }).setHTML(
            `<custom-pet-card owner-email="${ownerEmail}" pet-id="${id}" profile-image="${image}" pet-name="${fullname}" pet-zone="${zone}"></custom-pet-card>`
          )
        )
        .addTo(map);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAndSetPetsinToMap = async (map: any, pets: any, prov: any) => {
  try {
    const { lat, lng } = prov;
    pets = await state.getPetsAround(lat, lng);
    await putMarkers(map, pets);
  } catch (error) {
    console.error(error);
  }
};
