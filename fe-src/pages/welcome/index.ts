
import { Router } from "@vaadin/router";
import { state } from "../../state";
let imagen = require("../../imagenes/img-home.png")

export class Welcome extends HTMLElement{
    constructor(){
        super()
    }
     connectedCallback(){
        
         state.init()
        this.render()
        const darUbicacionButton = this.querySelector(".ubicacion") as any;
        darUbicacionButton.addEventListener("click", () => {
            Router.go("/miUbicacion"); 
        });
    }

    render(){
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

customElements.define("welcome-page", Welcome);
