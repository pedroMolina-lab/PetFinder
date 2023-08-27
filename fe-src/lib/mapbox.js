"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocoder = exports.initMapbox = void 0;
const dotenv = require("dotenv");
dotenv.config();
const MAPBOX_TOKEN = process.env.MAP_BOX_TOKEN;
const mapboxgl = require("mapbox-gl");
const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
require("mapbox-gl/dist/mapbox-gl.css");
require("@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css");
mapboxgl.accessToken = MAPBOX_TOKEN;
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    zoom: 9,
    countries: "ar",
    autocomplete: true,
    language: "es",
    marker: false,
});
exports.geocoder = geocoder;
function initMapbox(mapElement) {
    return new mapboxgl.Map({
        container: mapElement,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-64.204074, -31.4268539],
        zoom: 10,
        dragPan: true,
        scrollZoom: true,
    });
}
exports.initMapbox = initMapbox;
