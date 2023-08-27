import { Pet, User } from "../models";
import { index } from "../../fe-src/lib/algolia";
import { cloudinary } from "../../fe-src/lib/cloudinary";

export async function updateProfile(userId, updateData) {
  if (updateData.pictureURL) {
    console.log("no hay imagen",updateData.pictureDataUrl);
    
    const imagen = await cloudinary.uploader.upload(updateData.pictureURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 500,
    });

   
    
 
    try {
      const pet = await Pet.create({
        name: updateData.name,
        bio: updateData.bio,
        pictureURL: imagen.secure_url,
        lat: updateData.lat,
        lng: updateData.lng,
        lugar: updateData.lugar,
        userId: userId,
      });
      

      const algoliaRes = await index.saveObject({
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
    } catch (error) {
      console.error("Error al crear el perfil:", error);
      throw error;
    }
  } else {
    console.error("no hay imagen");
  }
}
export async function getUserWithPets(userId) {
  try {
    if (!userId) {
      throw new Error("no hay user id");
    }

    const user = await User.findByPk(userId, {
      include: Pet,
    });

    return user;
  } catch (error) {
    console.error("Error al obtener el usuario con mascotas:", error);
}
}

export async function deletePet(id){
  console.log("el id de el controller ", id);
  
  const pet = await Pet.destroy({
    where:{
      id,
    }
  })
  console.log("el animal es", pet);
  
  try {
    await index.deleteObject(id);
    console.log("Registro eliminado de Algolia:", id);
  } catch (error) {
    console.error("Error al eliminar registro de Algolia:", error);
  }

  return pet
}


export async function verMascotasConUsuarios() {
  try {
    const mascotas = await Pet.findAll({
      include: User, 
    });
    return mascotas;
  } catch (error) {
    throw error;
  }
}
export async function PetCerca(lat, lng) {
  try {
     const hits = await index.search("", {
        aroundLatLng: [lat, lng].join(","),
        aroundRadius: 100000,
     });

     return hits;
  } catch (e) {
     console.log(e);
  }}

  
