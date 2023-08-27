"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetCerca = exports.verMascotasConUsuarios = exports.deletePet = exports.getUserWithPets = exports.updateProfile = void 0;
const models_1 = require("../models");
const algolia_1 = require("../../fe-src/lib/algolia");
const cloudinary_1 = require("../../fe-src/lib/cloudinary");
async function updateProfile(userId, updateData) {
    if (updateData.pictureURL) {
        console.log("no hay imagen", updateData.pictureDataUrl);
        const imagen = await cloudinary_1.cloudinary.uploader.upload(updateData.pictureURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 500,
        });
        try {
            const pet = await models_1.Pet.create({
                name: updateData.name,
                bio: updateData.bio,
                pictureURL: imagen.secure_url,
                lat: updateData.lat,
                lng: updateData.lng,
                lugar: updateData.lugar,
                userId: userId,
            });
            const algoliaRes = await algolia_1.index.saveObject({
                objectID: pet.get("id"),
                name: pet.dataValues.name,
                bio: updateData.bio,
                lugar: pet.dataValues.lugar,
                pictureURL: pet.dataValues.pictureURL,
                _geoloc: {
                    lat: pet.dataValues.lat,
                    lng: pet.dataValues.lng,
                },
            });
            return [pet, algoliaRes];
        }
        catch (error) {
            console.error("Error al crear el perfil:", error);
            throw error;
        }
    }
    else {
        console.error("no hay imagen");
    }
}
exports.updateProfile = updateProfile;
async function getUserWithPets(userId) {
    try {
        if (!userId) {
            throw new Error("no hay user id");
        }
        const user = await models_1.User.findByPk(userId, {
            include: models_1.Pet,
        });
        return user;
    }
    catch (error) {
        console.error("Error al obtener el usuario con mascotas:", error);
    }
}
exports.getUserWithPets = getUserWithPets;
async function deletePet(id) {
    console.log("el id de el controller ", id);
    const pet = await models_1.Pet.destroy({
        where: {
            id,
        }
    });
    console.log("el animal es", pet);
    try {
        await algolia_1.index.deleteObject(id);
        console.log("Registro eliminado de Algolia:", id);
    }
    catch (error) {
        console.error("Error al eliminar registro de Algolia:", error);
    }
    return pet;
}
exports.deletePet = deletePet;
async function verMascotasConUsuarios() {
    try {
        const mascotas = await models_1.Pet.findAll({
            include: models_1.User,
        });
        return mascotas;
    }
    catch (error) {
        throw error;
    }
}
exports.verMascotasConUsuarios = verMascotasConUsuarios;
async function PetCerca(lat, lng) {
    try {
        const hits = await algolia_1.index.search("", {
            aroundLatLng: [lat, lng].join(","),
            aroundRadius: 100000,
        });
        return hits;
    }
    catch (e) {
        console.log(e);
    }
}
exports.PetCerca = PetCerca;
