"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const port = process.env.PORT || 3000;
const users_controllers_1 = require("./controllers/users-controllers");
const auth_controllers_1 = require("./controllers/auth-controllers");
const pet_controllers_1 = require("./controllers/pet-controllers");
const auth_1 = require("./models/auth");
// const staticDirPath = path.resolve(__dirname, "../dist");
const KEY = process.env.KEY_SECRET;
const app = express();
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
        const datosAuth = await (0, auth_controllers_1.createAuth)(req.body);
        console.log("soy el servidor", datosAuth);
        res.json(datosAuth);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post("/auth/token", async (req, res) => {
    const auth = await (0, auth_controllers_1.logInUser)(req.body);
    if (auth) {
        const token = jwt.sign({ email: auth.get("email") }, KEY);
        res.json({
            token,
            auth,
            message: "ingresaste",
        });
        return auth;
    }
    else {
        res.status(401).json({ message: "Credenciales inválidas" });
    }
});
app.get("/me", auth_controllers_1.authMiddleware, async (req, res) => {
    const user = await auth_1.Auth.findOne({ where: { email: req._user.email } });
    res.json(user);
    console.log(user.get("id"));
    console.log(req._user);
});
app.post("/profile/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.body) {
        res.status(400).json({
            message: "me faltan datos en el body",
        });
    }
    try {
        const updateData = await (0, pet_controllers_1.updateProfile)(id, req.body);
        console.log("esta creando correctametne");
        res.json({
            product: updateData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al crear el producto",
        });
    }
});
app.get("/profile/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await (0, pet_controllers_1.getUserWithPets)(id);
        console.log(profile);
        res.json(profile);
    }
    catch (error) {
        console.error("Error al obtener el perfil con mascotas:", error);
        res.status(500).json({ message: "Error al obtener el perfil con mascotas" });
    }
});
app.delete("/profile/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "me falta el id"
        });
    }
    else {
        const petDelete = await (0, pet_controllers_1.deletePet)(id);
        res.json(petDelete);
        return petDelete;
    }
});
app.get("/watch", async (req, res) => {
    try {
        const mascotasConUsuarios = await (0, pet_controllers_1.verMascotasConUsuarios)();
        console.log(mascotasConUsuarios);
        res.json(mascotasConUsuarios);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener mensaje" });
    }
});
app.post("/ubicacion/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const ubicacionUsuario = await (0, users_controllers_1.ubicacion)(id, req.body);
        res.json(ubicacionUsuario);
    }
    catch (error) {
        console.error("Error en la función de ubicación:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});
app.get("/pet-cerca", async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const response = await (0, pet_controllers_1.PetCerca)(lat, lng);
        res.json(response);
        return response;
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las mascotas cerca" });
    }
});
const staticDirPath = path.join(__dirname, "../dist/index.html");
app.use(express.static("dist"));
app.get("*", function (req, res) {
    res.sendFile(staticDirPath);
});
app.listen(port, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});
