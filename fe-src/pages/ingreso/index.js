"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InicioSesion = void 0;
const state_1 = require("../../state");
const router_1 = require("@vaadin/router");
class InicioSesion extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        state_1.state.init();
        this.render();
        const registroForm = this.querySelector(".inicio-form");
        registroForm?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const ubicacion = state_1.state.getState();
            console.log("ubicacion", ubicacion.lat, ubicacion.lng);
            delete ubicacion.lat;
            delete ubicacion.lng;
            const email = this.querySelector(".email").value;
            const password = this.querySelector(".password")
                .value;
            try {
                const loginData = await state_1.state.login(email, password);
                if (loginData.success == true) {
                    router_1.Router.go("/");
                }
                else {
                    alert("El usuario o contraseña no coinciden");
                }
            }
            catch (error) {
                console.error("Error al intentar ingresar:", error);
            }
        });
    }
    render() {
        this.innerHTML = `
            <custom-navbar></custom-navbar>
            <div class="welcome-content">
                <h1 class="welcome-title">Iniciar Sesión</h1>
                <p>Ingresá los siguientes datos para iniciar sesión</p>
            <form class="inicio-form">

                <div class="input-container">
                    <label for="email">Email:</label>
                    <input type="email" class="email" name="email" placeholder="Ingresa tu email">
                </div>
                <div class="input-container">
                    <label for="password">Contraseña:</label>
                    <input type="password" class="password" name="password" placeholder="Ingresa tu contraseña">
                </div>
                <button class="button"type="submit">Acceder</button>

            </form>

                <p>Aun no tenes cuenta? <a id="register-link" href="#">Registrate</a></p>
            </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
            .welcome-content {
                text-align: center;
                padding: 20px;
            }

            .welcome-title {
                font-size: 36px;
                width: 301px;
                margin-bottom: 10px;
                color: #000000;
                margin: 0 auto; 
            }
            
            .welcome-content p {
                width: 266px;
                font-size: 16px;
                color: #000000;
                margin: 0 auto; 
                margin-top: 30px; 
            }

            .input-container {
                margin-top: 40px;
                text-align: left;
                text-align: center;
            }

            label {
                display: block;
                font-size: 18px;
                margin-bottom: 5px;
                color: #000000;
            }

            input {
                max-width: 270px;
                width: 100%;
                padding: 10px;
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }

            .welcome-content img {
                max-width: 100%;
                height: auto;
                margin-top: 20px;
            }
            .button {
                margin-top: 30px;
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
        `;
        this.appendChild(style);
        const registerLink = this.querySelector("#register-link");
        registerLink?.addEventListener("click", () => {
            router_1.Router.go("/registro");
        });
    }
}
exports.InicioSesion = InicioSesion;
customElements.define("inicio-page", InicioSesion);
