import { state } from "../../state";
import { Router } from "@vaadin/router";
import { InitDropzone } from "../../lib/dropzone";
import * as mapboxgl from "mapbox-gl";
import { initMapbox, geocoder } from "../../lib/mapbox";
let imagen = require("../../imagenes/img-insertar.png");
// let imagenInsert = require("../../imagenes/img-mapa-insert.png")

export class ReportePet extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    state.init();
    this.render();

    setTimeout(() => {
      const token = state.getState();

      if (!token) {
        alert("Debes iniciar sesión para continuar");
        Router.go("/");
      }
    }, 10);


    const mapboxUbi = this.querySelector(".mapbox-ubi");

    const that = this;
    dataMapbox(mapboxUbi);
    const dataAGuardar = {};
    function dataMapbox(el) {
      const search = that.querySelector(".search");

      const map = initMapbox(el);

      if (search) {
        search.appendChild(geocoder.onAdd(map));
        
        geocoder.on("result", function (e) {
          const result = e.result;
          const [lng, lat] = result.geometry.coordinates;
          new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
          map.setCenter([lng, lat]);
          map.setZoom(14);
          dataAGuardar["lugar"] = result.place_name;
          dataAGuardar["lng"] = lng
          dataAGuardar["lat"] = lat;
          
        });
      }
    }

    const form: any = document.querySelector(".reporte-form");
    let pictureFile;
    let imageDataUrl;
    const myDropzone = InitDropzone(".profile-pic");
    myDropzone.on("addedfile", function (file) {
      const previousImage = document.querySelector(
        ".insert-image"
      ) as HTMLElement;
      const previousText = document.querySelector(".text-info") as HTMLElement;
      const deleteText = document.querySelector(".delete-link") as HTMLElement;

      if (previousImage) {
        previousImage.style.display = "none";
      }
      if (previousText) {
        previousText.style.display = "none";
      }
      if (deleteText) {
        deleteText.style.display = "block";
      }

      deleteText.addEventListener("click", () => {
        myDropzone.removeAllFiles();

        previousImage.style.display = "block";
        previousText.style.display = "block";
        deleteText.style.display = "none";
      });

      pictureFile = file;
    });
    const imageElement = document.querySelector(".insert-image");
    imageElement?.addEventListener("click", () => {
      myDropzone.hiddenFileInput.click();
    });
    form.addEventListener("submit", async (e) => {
      const name = (this.querySelector(".name") as HTMLInputElement).value;
      const bio = (this.querySelector(".bio") as HTMLInputElement).value;
      const lugar = dataAGuardar["lugar"]
      const lat = dataAGuardar["lat"]
      const lng = dataAGuardar["lng"]
      const pictureURL = pictureFile.dataURL

      e.preventDefault();
      
      

     const cs =  state.getState()
     cs.name = name
     cs.bio = bio
     cs.lugar = lugar
     cs.lat = lat
     cs.lng = lng
     cs.pictureURL = pictureURL
      
     console.log({
        name,
        bio,
        pictureURL,
       lugar,
       lat,
       lng
      });

      try{
        const createPet = await state.createPet({
          name,
          bio,
          pictureURL: pictureFile.dataURL,
         lugar,
         lat,
         lng
        })

          alert("mascota reportada con exito")
          Router.go("/")

      }catch (error) {
        console.error("Error al crear la mascota:", error);
        alert("Error al crear la mascota");
      }
      const token = state.getState()
   
      if(token){
        alert("debes iniciar sesion para continuar")
      }



    });
  }

  render() {
    this.innerHTML = `
        <custom-navbar></custom-navbar>
        <div class="welcome-content">
            <h1 class="welcome-title">Reportar Mascota</h1>
            <h4 class="text-info">Ingresá la siguiente información para realizar el reporte de la mascota</h4>
            <form class="reporte-form">
                <div class="input-container">
                    <label for="name">Nombre:</label>
                    <input type="name" class="name" name="name" placeholder="Ingresa el nombre de tu mascota">
                </div>
                <div class="input-container">
                    <label for="name">Referencias:</label>
                    <input type="text" class="bio" name="bio" placeholder="Indica las referencias">
                </div>
                <div class="profile-pic">
                    <img src="${imagen}" alt="Imagen" class="insert-image">
                    <h4 class="text-info">Haz click o arrastra la imagen de tu mascota</h4>
                </div>
                <p><a class="delete-link" href="#">Eliminar foto</a></p>
                <div class="report__form-mapbox">
                <h4 class="text-info">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</h4>
                    <div class="mapbox-ubi" style='width: 100%; height: 250px;'></div>
                    <div class="search" required></div>
                    </div>
                <div class="input-container2">
                    <button class="button" type="submit">Reportar</button>
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
            .input-container2 {
                margin-top: 10px;
                text-align: left;
                text-align: center;
                margin-bottom: 50px;
                max-width: 270px;
                margin: 0 auto;
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
              .profile-pic {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                margin-top: 20px;
                margin: 0 auto; 
                max-width: 270px; 
            }

    

            .image-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                margin-top: 50px;
            }
        
        
            .image-text {
                max-width: 90%;
                word-wrap: break-word;
            }
            .delete-link{
                display: none;
            }
            
            .text-info{
                width: 270px;
                font-size: 16px;
                color: #000000;
                margin: 0 auto; 
                margin-top:30px; 
                
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

    const registerLink = this.querySelector("#register-link");
    registerLink?.addEventListener("click", () => {
      Router.go("/registro");
    });
  }
}

customElements.define("reporte-page", ReportePet);
