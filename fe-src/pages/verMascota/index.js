"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verMascotasReportadas = void 0;
const state_1 = require("../../state");
class verMascotasReportadas extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback() {
        state_1.state.init();
        this.render();
        try {
            const verMascotasResponse = await state_1.state.verMascotasPerdidas();
            const cs = state_1.state.getState();
            const lat = cs.lat;
            const lng = cs.lng;
            if (lng && lat) {
                try {
                    const ubicacionSection = this.querySelector(".ubicacion");
                    ubicacionSection.classList.add("hidden");
                    const petCerca = await state_1.state.getPetCerca(lat, lng);
                    if (petCerca.hits.length === 0) {
                        const ubicacionSection2 = this.querySelector(".ubicacion2");
                        ubicacionSection2.classList.remove("hidden");
                    }
                    else {
                        console.log("ocultando");
                        const ubicacionSection2 = this.querySelector(".ubicacion2");
                        ubicacionSection2.classList.add("hidden");
                    }
                    this.renderPetCards(petCerca.hits);
                }
                catch (error) {
                    console.log("Error al obtener mascotas cerca:", error);
                }
            }
            else {
                this.renderPetCards(verMascotasResponse);
            }
        }
        catch (error) {
            console.error("Error al obtener las mascotas reportadas:", error);
        }
    }
    renderPetCards(pets) {
        const petListContainer = this.querySelector(".pet-list");
        pets.forEach((pet) => {
            const petCard = document.createElement("div");
            petCard.classList.add("pet-card");
            const petImage = document.createElement("img");
            petImage.src = pet.pictureURL;
            petImage.alt = pet.name;
            const petName = document.createElement("p");
            petName.textContent = pet.name
                ? `Nombre: ${pet.name}`
                : "Nombre: No se proporcionó información";
            petName.classList.add("pet-name");
            const petLocation = document.createElement("p");
            petLocation.textContent = pet.lugar
                ? `Lugar: ${pet.lugar}`
                : "Lugar: No se proporcionó información";
            petLocation.classList.add("pet-location");
            const petBio = document.createElement("p");
            petBio.textContent = pet.bio
                ? `Referencias: ${pet.bio}`
                : "Referencias: No se proporcionó información";
            petBio.classList.add("pet-bio");
            const petUserEmail = document.createElement("p");
            petUserEmail.textContent = pet.user
                ? `Datos de contacto: ${pet.user.email}`
                : "Datos de contacto: No se proporcionó información";
            petUserEmail.classList.add("pet-user-email");
            petCard.appendChild(petImage);
            petCard.appendChild(petName);
            petCard.appendChild(petBio);
            petCard.appendChild(petLocation);
            petCard.appendChild(petUserEmail);
            petListContainer.appendChild(petCard);
        });
    }
    render() {
        this.innerHTML = `
      <custom-navbar></custom-navbar>
      <h1 class="ubicacion2">No hay ninguna mascota cerca tuyo..

      <h1 class="ubicacion">Para ver las mascotas cerca tuyo proporciona una ubicacion
      <a href="/miUbicacion">Haz clic aquí</a></h1>
      <div class="pet-list"></div>
    `;
        const style = document.createElement("style");
        style.innerHTML = `
    .hidden {
      display: none;
    }
    .ubicacion{
      font-size: 18px;
    }
    .ubicacion2{
      font-size: 24px;
      text-align: center;
    }
    
    .pet-list {
        padding: 20px;
      }
      
      .pet-card {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        margin-bottom: 20px; 
      }
      
      .pet-card img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
        max-height: 150px;
      }
      .pet-name{
        font-size: 24px;
        margin-top: 5px;
        color: #666; 
      }
      .pet-location {
        font-size: 12px;
        margin-top: 5px;
        color: #666; 
      }
      .pet-bio {
        font-size: 19px;
        margin-top: 10px;
        color: #666; 
      }
      .pet-user-email {
        font-size: 12px;
        margin-top: 10px;
        color: #666; 
      }
    `;
        this.appendChild(style);
    }
}
exports.verMascotasReportadas = verMascotasReportadas;
customElements.define("ver-mascotas-reportadas", verMascotasReportadas);