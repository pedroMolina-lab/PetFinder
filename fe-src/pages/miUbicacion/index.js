"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.miUbicacion = void 0;
const state_1 = require("../../state");
const router_1 = require("@vaadin/router");
const mapboxgl = require("mapbox-gl");
const mapbox_1 = require("../../lib/mapbox");
class miUbicacion extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        state_1.state.init();
        this.render();
        const ubicacion = state_1.state.getState();
        console.log("ubicacion ", ubicacion.lat);
        const mapboxUbi = this.querySelector(".mapbox-ubi");
        const that = this;
        const dataAGuardar = {};
        function dataMapbox(el) {
            const search = that.querySelector(".search");
            const map = (0, mapbox_1.initMapbox)(el);
            if (search) {
                search.appendChild(mapbox_1.geocoder.onAdd(map));
                mapbox_1.geocoder.on("result", function (e) {
                    const result = e.result;
                    const [lng, lat] = result.geometry.coordinates;
                    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
                    map.setCenter([lng, lat]);
                    map.setZoom(14);
                    dataAGuardar["lugar"] = result.place_name;
                    dataAGuardar["lng"] = lng;
                    dataAGuardar["lat"] = lat;
                });
            }
        }
        dataMapbox(mapboxUbi);
        const form = document.querySelector(".reporte-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const lugar = dataAGuardar["lugar"];
            const lat = dataAGuardar["lat"];
            const lng = dataAGuardar["lng"];
            const cs = state_1.state.getState();
            cs.lugar = lugar;
            cs.lat = lat;
            cs.lng = lng;
            try {
                const postUbicacion = await state_1.state.createUbicacion({
                    lugar,
                    lat,
                    lng
                });
                router_1.Router.go("/");
            }
            catch (error) {
                console.error("Error al crear la mascota:", error);
                alert("Error al dar la ubicacion");
            }
        });
    }
    render() {
        this.innerHTML = `
      <custom-navbar></custom-navbar>
      <div class="welcome-content">
        <h3 class="welcome-title">Selecciona tu ubicacion actual, asi podras ver las mascotas que se reportaron cerca tuyo</h3>
        <form class="reporte-form">
          <div class="report__form-mapbox">
            <div class="mapbox-ubi" style="width: 100%; height: 250px;"></div>
            <div class="search" required></div>
          </div>
          <div class="input-container2">
            <button class="button" type="submit">Dar mi ubicacion</button>
          </div>
        </form>
      </div>
    `;
        const style = document.createElement("style");
        style.innerHTML = `
            .welcome-content {
                text-align: center;
                padding: 20px;
            }

            .welcome-title {
                font-size: 30px;
                width: 301px;
                margin-bottom: 10px;
                color: #000000;
                margin: 0 auto; 
            }
            
         

            .input-container2 {
                margin-top: 10px;
                text-align: left;
                text-align: center;
                margin-bottom: 50px;
                max-width: 270px;
                margin: 0 auto;
            }

           
          
            .button, .button-insert {
                background-color: #29b4dc;
                width: 270px;
                color: #fff;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-family: "Odibee Sans";
                font-size: 24px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
      
              .button:hover {
                transform: scale(1.1)
              }
             

    
            .report__form-mapbox{
                display: flex;
                flex-direction: column;
                max-width: 280px;
                margin: 0 auto;
                margin-bottom: 50px;

              }
              .report__form-mapbox-map{
                margin: 0 auto;
              }
              .search > .mapboxgl-ctrl-geocoder{
                width: 100%;
                max-width: none
              }
            
        `;
        this.appendChild(style);
    }
}
exports.miUbicacion = miUbicacion;
customElements.define("ubicacion-page", miUbicacion);
