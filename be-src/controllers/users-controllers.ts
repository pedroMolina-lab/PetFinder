import { User, Pet } from "../models";
import { cloudinary } from "../../fe-src/lib/cloudinary";
import { index } from "../../fe-src/lib/algolia";

// export async function createProduct(userId: number, productData) {
//   if (!userId) {
//     throw "userId es necesario";
//   }
//   const user = await User.findByPk(userId);
//   if (user) {
//     const product = await Product.create({
//       ...productData,
//       userId: user.get("id"),
//     });

//     return product;
//   } else {
//     throw "error, user not found";
//   }
// }



export async function createdUser(auth, userData){
  const { email } = userData;

  const [user, createdUser] = await User.findOrCreate({
    where: {  UserId: auth.get("id"), },
    defaults: {
      email,
      user_id: auth.get("id")
    },
  });
  console.log();
  return [user, createdUser]
  
}

// export async function createUser(authId, userData) {
//   try {
//     const { email } = userData;

//     const [user, createdUser] = await User.findOrCreate({
//       where: { email },
//       defaults: {
//         email,
//         user_id: authId,
//       },
//     });

//     return [user, createdUser];
//   } catch (error) {
//     throw new Error('Error creating user');
//   }
// }

export async function updateProfile(userId, updateData) {
  if (updateData.pictureURL) {
    const imagen = await cloudinary.uploader.upload(updateData.pictureURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 500,
      
    });
    
    
    const updateDataComplete = {
      name: updateData.name,
      bio: updateData.bio,
      pictureURL: imagen.secure_url,
      lat: updateData.lat,
      lng: updateData.lng,
      lugar: updateData.lugar


    }
    await User.update(updateDataComplete,
      {
        where: {
          id: userId
        },
      }
    );
   
    
    return updateDataComplete
  }else{
    console.error("no hay imagen");
    
  }
}

  export async function ubicacion(userId, update){
    const userProfile = await User.findByPk(userId)
    if(userProfile){
      await userProfile.update({
        lat: update.lat,
        lng: update.lng,
        lugar: update.lugar
      })
 
      return userProfile
    }else{
      console.error("error al dar la ubicacion ")
    }

    
}
