import { state } from "../../state";
import { Router } from "@vaadin/router";

export class MascotasReportadas extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    state.init();
    this.render();
    
    this.loadMascotasReportadas();
  }
  
  async loadMascotasReportadas() {
    try {
      const reporteResponse = await state.mascotasReportadas();
          
      if (reporteResponse && reporteResponse.pets.length > 0) {
        
        const petListContainer = this.querySelector(".pet-list") as any;
  
        reporteResponse.pets.forEach(pet => {
       
          
      

          const petCard = document.createElement("div");
          petCard.classList.add("pet-card");
  
          const petImage = document.createElement("img");
          petImage.src = pet.pictureURL;
          petImage.alt = pet.name;
  
          const petName = document.createElement("p");
          petName.textContent = `Nombre: ${pet.name !=="null" ? pet.name: "no se proporciono informacion"}`;
          petName.classList.add("pet-name"); 

  
          const petLocation = document.createElement("p");
          petLocation.textContent = `Lugar: ${pet.lugar}`;
          petLocation.classList.add("pet-location"); 

          const petBio = document.createElement("p");
          petBio.textContent = `Referencias: ${pet.bio !=="null" ? pet.bio: "no se proporciono informacion"}`;
          petBio.classList.add("pet-bio"); 
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Eliminar";
          deleteButton.classList.add("delete-button");
          deleteButton.addEventListener("click", async () => {
            const confirmDelete = window.confirm("estas seguro que quieres eliminar?")
            if(confirmDelete){
              await state.eliminarMascota(pet.id);
              location.reload();

            }
          });
          
          
          petCard.appendChild(deleteButton);
          petCard.appendChild(petImage);
          petCard.appendChild(petName);
          petCard.appendChild(petBio);
          petCard.appendChild(petLocation);

  
          petListContainer.appendChild(petCard);
        });
      } else {
         alert("no hay mascotas reportadas")

        console.error("Error al obtener las mascotas reportadas:", reporteResponse.message);
      }
    } catch (error) {
      console.error("Error al obtener las mascotas reportadas:", error);
    }
  }
  

  

  render() {
    this.innerHTML = `
      <custom-navbar></custom-navbar>
      <div class="pet-list"></div>
    `;
  
    const style = document.createElement("style");
    style.innerHTML = `
      .pet-list {
        padding: 20px;
      }
      
      .pet-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 20px;
      }
      
      .pet-card img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
        max-height: 150px;
      }
      
      .pet-name {
        font-size: 24px;
        margin-top: 5px;
        color: #666;
      }
      
      .pet-location {
        font-size: 14px;
        margin-top: 5px;
        color: #666;
      }
      
      .pet-bio {
        font-size: 16px;
        margin-top: 10px;
        color: #666;
      }
      
      .delete-button {
        margin-top: 10px;
        padding: 10px;
        align-self: flex-end;
      }
      
      @media (max-width: 750px) {
        .pet-card {
          align-items: flex-start;
        }
      
        .delete-button {
          margin-top: 10px;
          align-self: flex-end;
        }
      }
      
    `;
  
    this.appendChild(style);
  }
  
}

customElements.define("mascotas-reportadas", MascotasReportadas);
