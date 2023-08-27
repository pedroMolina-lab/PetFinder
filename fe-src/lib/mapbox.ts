import * as dotenv from "dotenv"
dotenv.config()
const MAPBOX_TOKEN = process.env.MAP_BOX_TOKEN
import * as mapboxgl from "mapbox-gl"
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
(mapboxgl as any).accessToken = MAPBOX_TOKEN



const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    zoom: 9,
    countries: "ar",
    autocomplete: true,
    language: "es",
    marker: false,

  });


  function initMapbox(mapElement) {
    return new mapboxgl.Map({
       container: mapElement,
       style: "mapbox://styles/mapbox/streets-v11",
       center: [-64.204074, -31.4268539],
       zoom: 10,
       dragPan: true,
       scrollZoom: true,
    })}


export {initMapbox, geocoder}