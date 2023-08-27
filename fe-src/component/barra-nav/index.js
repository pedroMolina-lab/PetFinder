"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
let imagenLogo = require("../../imagenes/img-mapa.png");
let menu = require("../../imagenes/menu.png");
class CustomNavbar extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        div.innerHTML = `
            <nav class="navbar">
                <a class="logo">
                    <img src="${imagenLogo}" alt="Logo">
                </a>
                <div class="menu">
                    <img src="${menu}" alt="Menu" class="menu-icon">
                    <div class="menu-items">
                        <a class="textIngresar">Ingresar</a>
                        <a class="textMisMascotas">Mis mascotas reportadas</a>
                        <a class="textReportarMascotas">Reportar mascota</a>
                        <a class="textVerMascotas">Ver mascotas Perdidas</a>

                        <h1 class="volver">Salir</h1>
                    </div>
                </div>
                <div class="text-container">
                    <a class="textIngresar2">Ingresar</a>
                    <a class="textMisMascotas2">Mis mascotas reportadas</a>
                    <a class="textReportarMascotas2">Reportar mascota</a>
                    <a class="textVerMascotas2">Ver mascotas Perdidas</a>

                </div>
            </nav>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
            .navbar {
                background-color: #343a40;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                display: flex;
                align-items: center;
                color: #fff;
                text-decoration: none;
                font-weight: bold;
            }
            .logo img {
                width: 28px;
                height: auto;
                margin-right: 0.5rem;
            }
            .text-container {
                display: flex;
                align-items: center;
            }
            .textIngresar,
            .textMisMascotas,
            .textReportarMascotas,
            .textVerMascotas {
                color: #fff;
                text-decoration: none;
                margin-left: 1rem;
            }

            .textIngresar2,
            .textMisMascotas2,
            .textReportarMascotas2,
            .textVerMascotas2 {
                color: #fff;
                text-decoration: none;
                margin-left: 1rem;
            }

            .menu {
                display: none;
            }
            .menu.active .menu-items {
                display: block;
            }
            .menu-items {
                display: none;
                position: absolute;
                top: 100%;
                left: 50;
                background-color: #343a40;
                padding: 1rem;
            }
            .menu-items .text {
                display: block;
                margin: 0.5rem 0;
            }
            .volver {
                color: #29b4dc;
            }
            @media (max-width: 750px) {
                .menu {
                    display: block;
                }
                .text-container {
                    display: none;
                }
                .menu.active .menu-items {
                    display: block;
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: #343a40;
                    padding: 1rem;
                }
            }
        `;
        shadow.appendChild(style);
        shadow.appendChild(div);
        const logo = div.querySelector(".logo");
        const menuIcon = div.querySelector(".menu-icon");
        const volverLink = div.querySelector(".volver");
        const textVerMascotas = div.querySelector(".textVerMascotas");
        const textVerMascotas2 = div.querySelector(".textVerMascotas2");
        const textIngresar = div.querySelector(".textIngresar");
        const textIngresar2 = div.querySelector(".textIngresar2");
        const textMisMascotas = div.querySelector(".textMisMascotas");
        const textMisMascotas2 = div.querySelector(".textMisMascotas2");
        const textReportarMascotas = div.querySelector(".textReportarMascotas");
        const textReportarMascotas2 = div.querySelector(".textReportarMascotas2");
        logo.addEventListener("click", () => {
            router_1.Router.go("/");
        });
        textIngresar.addEventListener("click", () => {
            router_1.Router.go("/ingreso");
        });
        textIngresar2.addEventListener("click", () => {
            router_1.Router.go("/ingreso");
        });
        textMisMascotas.addEventListener("click", () => {
            router_1.Router.go("/petReport");
        });
        textMisMascotas2.addEventListener("click", () => {
            router_1.Router.go("/petReport");
        });
        textReportarMascotas.addEventListener("click", () => {
            router_1.Router.go("/reporte");
        });
        textReportarMascotas2.addEventListener("click", () => {
            router_1.Router.go("/reporte");
        });
        menuIcon.addEventListener("click", () => {
            div.querySelector(".menu")?.classList.toggle("active");
        });
        volverLink.addEventListener("click", () => {
            div.querySelector(".menu")?.classList.remove("active");
        });
        textVerMascotas.addEventListener("click", () => {
            router_1.Router.go("/verMascota");
        });
        textVerMascotas2.addEventListener("click", () => {
            router_1.Router.go("/verMascota");
        });
    }
}
customElements.define("custom-navbar", CustomNavbar);
