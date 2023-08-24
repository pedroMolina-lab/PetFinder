const apiUrl = "http://localhost:3000";

const state = {
  data: {
    geolocation: {
      latitude: "",
      longitude: "",
    },
    name: "",
    lastname: "",
    password: "",
    email: "",
    confirmPassword: "",
    token: "",
  },

  listeners: [],

  init() {
    const lastStorageState = localStorage.getItem("state");
    if (lastStorageState !== null) {
      this.setState(JSON.parse(lastStorageState));
    }
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("Soy el state, he cambiado", this.data);
  },

  subscribe(callback) {
    this.listeners.push(callback);
  },

  async auth() {
    try {
      const cs = this.getState();

      const authResponse = await fetch(apiUrl + "/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cs),
      });

      const authData = await authResponse.json();
      if (authData[0]) {
        const { auth, token } = authData;

        const newState = {
          ...cs,
          ...auth,
          token,
        };
        this.setState(newState);

        console.log("Autenticación exitosa:", authData);

        return { message: "Autenticación exitosa", success: true };
      } else {
        console.log("Authentication failed:");
        return { succes: false };
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      if (error.error) {
        alert(error.error);
      }
    }
  },
  async login(email, password) {
    try {
      const loginResponse = await fetch(apiUrl + "/auth/token", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();
      if (loginData.message == "ingresaste") {
        const { user, token } = loginData;
        const {id} = loginData.auth
        const newState = {
          ...this.getState(),
          ...user,
          token,
          id,
          
        };
        console.log("Respuesta del servidor:", loginData);

        this.setState(newState);

        return { success: true };
      } else {
        console.log("Inicio de sesión fallido.");

        return { success: false, message: "Inicio de sesión fallido" };
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      return { success: false, message: "Error al intentar iniciar sesión" };
    }
  },

 async createPet(data) {
    const cs = this.getState();
    try {
      const createResponse = await fetch(apiUrl + "/profile/" + cs.id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      console.log("este es el id",cs.id);
      

      const res = await createResponse.json()
      console.log(res);
      
      return  {success: true}

    } catch (error) {
      console.error("Error al crear:", error);
      return { success: false, message: "Error al crear pet" };
    }
  },

  async mascotasReportadas(){
    const cs = this.getState()
    try{
      const reporteResponse = await fetch (apiUrl + "/profile/"+ cs.id)
      const res = await reporteResponse.json()
      console.log(res);
      return res
    }catch(error){
      console.error("Error al encontrar:", error);
      return { success: false, message: "Error al encontrar pet" };
    }
  },
  async verMascotasPerdidas(){
    try{
      const verResponse = await fetch (apiUrl + "/watch")
      const res = await verResponse.json()
      
      return res
      
    }catch(error){
      console.error("Error al encontrar:", error);
      return { success: false, message: "Error al encontrar pet" };
    }
    },


    async eliminarMascota(id) {
      try {
        const response = await fetch(apiUrl + `/profile/${id}`, {
          method: "DELETE"
        });
        const data = await response.json();
        console.log("Mascota eliminada:", data);
      } catch (error) {
        console.error("Error al eliminar la mascota:", error);
      }
    },
    async createUbicacion(data) {
      const cs = this.getState();
      try {
        const createResponse = await fetch(apiUrl + "/ubicacion/" + cs.id, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        console.log("este es el id",cs.id);
        
  
        const res = await createResponse.json()
        console.log("esta es la respuesta",res);
        const newState = {
          ...this.getState(),
          ...res,
         
          
        };
        console.log("Respuesta del servidor:", res);

        this.setState(newState);

        return  {success: true}
  
      } catch (error) {
        console.error("Error al crear:", error);
        return { success: false, message: "Error al crear pet" };
      }
    },
    async getPetCerca(lat, lng) {
      const res = await fetch(apiUrl + `/pet-cerca?lat=${lat}&lng=${lng}`, {
         headers: {
            "Content-Type": "application/json",
         },
      });
      const data = await res.json();
      console.log(data);

      if (data[0]) {
         this.petsCerca = data[0].hits;
      }

      return data;
   },
};


export { state };
