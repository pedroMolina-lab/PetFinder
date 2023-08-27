"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Welcome = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../../state");
let imagen = require("../../imagenes/img-home.png");
class Welcome extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        state_1.state.init();
        this.render();
        const darUbicacionButton = this.querySelector(".ubicacion");
        darUbicacionButton.addEventListener("click", () => {
            router_1.Router.go("/miUbicacion");
        });
    }
    render() {
        this.innerHTML = `
        
        <custom-navbar></custom-navbar>
        <div class="welcome-content">
        <h1 class="welcome-title">Pet Finder App</h1>
            <p>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
            <img src="${imagen}" alt="Welcome Image">
            
            <button-el class="ubicacion">Dar mi ubicacion actual</button-el>
            <button-el class="">Como funciona Pet Finder?</button-el>

            </div>

        `;
        const style = document.createElement('style');
        style.innerHTML = `
            .welcome-content {
                text-align: center;
                padding: 20px;
            }

            .welcome-title {
                font-size: 36px;
                margin-bottom: 10px;
                color: #EB6372
            }
            
            .welcome-content p {
                font-size: 24px;
                color: #000000;
            }
            .welcome-content img {
                max-width: 100%;
                height: auto;
                margin-top: 70px;
            }
            button-el {
                margin-top: 20px;
                display: block;
                
         }
         
        
            
        `;
        this.appendChild(style);
    }
}
exports.Welcome = Welcome;
customElements.define("welcome-page", Welcome);
