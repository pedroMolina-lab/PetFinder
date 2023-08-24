import { state } from "../../state";
import { Router } from "@vaadin/router";

export class registrarSesion extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    state.init();
    this.render();

    const registroForm = this.querySelector(".registro-form");
    registroForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = (this.querySelector(".name") as HTMLInputElement).value;
      const lastname = (this.querySelector(".lastname") as HTMLInputElement)
        .value;
      const email = (this.querySelector(".email") as HTMLInputElement).value;
      const password = (this.querySelector(".password") as HTMLInputElement)
        .value;
      const confirmPassword = (
        this.querySelector(".confirm-password") as HTMLInputElement
      ).value;

      const cs = state.getState();
      cs.name = name;
      cs.lastname = lastname;
      cs.email = email;
      cs.password = password;
      cs.confirmPassword = confirmPassword;

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
        return;
      }

      try {
        const auth: any = await state.auth();
        console.log("este es el registro", auth);
        
        

        if (auth.success == true) {
            Router.go("/ingreso");
        } else {
            alert("el usuario ya existe, intentelo nuevamente.");
        }
      } catch (error) {
        alert(error);
      }
    });
    
  }

  render() {
    this.innerHTML = `
        <custom-navbar></custom-navbar>
        <div class="welcome-content">
            <h1 class="welcome-title">Registrarse</h1>
            <p>Ingrese los siguientes datos para registrarse</p>
            <form class="registro-form">
                <div class="input-container">
                    <label for="name">Nombre:</label>
                    <input type="text" class="name" name="name" placeholder="Ingrese su nombre" required>
                </div>
                <div class="input-container">
                    <label for="lastname">Apellido:</label>
                    <input type="text" class="lastname" name="lastname" placeholder="Ingrese su apellido" required>
                </div>
                <div class="input-container">
                    <label for="email">Email:</label>
                    <input type="email" class="email" name="email" placeholder="Ingrese su email" required>
                </div>
                <div class="input-container">
                    <label for="password">Contraseña:</label>
                    <input type="password" class="password" name="password" placeholder="Ingrese su contraseña" required>
                </div>
                <div class="input-container">
                    <label for="confirm-password">Confirmar Contraseña:</label>
                    <input type="password" class="confirm-password" name="confirm-password" placeholder="Confirme su contraseña" required>
                </div>
                <button class="button"type="submit">Registrarse</button>
            </form>
            <p>¿Ya tiene una cuenta? <a class="login-link" href="#">Ingresar</a></p>
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
                margin-top: 20px;
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
    
    const loginLink = this.querySelector(".login-link");
    loginLink?.addEventListener("click", () => {
      Router.go("/ingreso");
    });
  
  }
}

customElements.define("registro-page", registrarSesion);
