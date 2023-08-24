import * as dotenv from "dotenv"
dotenv.config()
import * as express from "express";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import * as cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
import { ubicacion, createdUser  } from "./controllers/users-controllers";
import {
  createAuth,
  logInUser,
  authMiddleware,
} from "./controllers/auth-controllers";
import { updateProfile, getUserWithPets, deletePet, verMascotasConUsuarios, PetCerca } from "./controllers/pet-controllers";
import { Auth } from "./models/auth";


const KEY = process.env.KEY_SECRET;

app.use(express.json({
  limit: "50mb",
}));
app.use(cors());







// import { sequelize } from "./models/connection"
// sequelize.sync({force: true})
// export {sequelize}

// ver que hay en la base de datos

// (async () => {
//   try {
//     const allAuthRecords = await Auth.findAll();
//     const todoslospets = await Pet.findAll()
//     console.log(allAuthRecords, todoslospets);
//   } catch (error) {
//     console.error('Error al consultar la base de datos:', error);
//   }
// })();

app.post("/auth", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "me faltan datos en el body",
    });
  }
  try {
    const datosAuth = await createAuth(req.body);
    console.log("soy el servidor", datosAuth);
    
    res.json(datosAuth);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post("/auth/token", async (req, res) => {
  const auth = await logInUser(req.body);
  if (auth) {

    const token = jwt.sign({ email: auth.get("email") }, KEY);
    res.json({
      token,
      
      auth,
      message: "ingresaste",
      
    });
    return auth
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});


app.get("/me", authMiddleware, async (req, res) => {
  const user = await Auth.findOne({ where: { email: req._user.email } });
  res.json(user);
  console.log(user.get("id"));
  console.log(req._user);
});



app.post("/profile/:id", async (req, res) => {
  const {id} = req.params
  if (!req.body) {
    
    res.status(400).json({      
      message: "me faltan datos en el body",
      
    });
  }
  try {
    
    const updateData = await updateProfile(id, req.body);
    console.log("esta creando correctametne");
    
    res.json({
      
      product: updateData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
});
app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await getUserWithPets(id);
    console.log(profile);

    res.json(profile);
  } catch (error) {
    console.error("Error al obtener el perfil con mascotas:", error);
    res.status(500).json({ message: "Error al obtener el perfil con mascotas" });
  }
});

app.delete("/profile/:id", async(req, res)=>{
  const {id} = req.params
  if(!id){
    res.status(400).json({
      message: "me falta el id"
    })
  }else{
    
    const petDelete = await deletePet(id)
    res.json(petDelete)

    return petDelete
  }
})
app.get("/watch", async (req, res) => {
  try {
    const mascotasConUsuarios = await verMascotasConUsuarios();
    console.log(mascotasConUsuarios);
    
    res.json(mascotasConUsuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener mensaje" });
  }
});

app.post("/ubicacion/:id", async(req, res)=>{
  const {id} = req.params
    const ubicacionUsuario = await ubicacion(id, req.body)
    res.json(ubicacionUsuario)
  
})

app.get("/pet-cerca", async (req, res)=>{
  const {lat, lng} = req.query
  try{
    const response = await PetCerca(lat, lng)
    
      res.json(response)
      return response
    

  }catch (error) {
    res.status(500).json({ message: "Error al obtener las mascotas cerca" });
  }
}) 


const staticDirPath = path.resolve(__dirname, "..dist");

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
