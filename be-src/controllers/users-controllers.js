"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ubicacion = exports.updateProfile = exports.createdUser = void 0;
const models_1 = require("../models");
const cloudinary_1 = require("../../fe-src/lib/cloudinary");
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
async function createdUser(auth, userData) {
    const { email } = userData;
    const [user, createdUser] = await models_1.User.findOrCreate({
        where: { UserId: auth.get("id"), },
        defaults: {
            email,
            user_id: auth.get("id")
        },
    });
    console.log();
    return [user, createdUser];
}
exports.createdUser = createdUser;
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
async function updateProfile(userId, updateData) {
    if (updateData.pictureURL) {
        const imagen = await cloudinary_1.cloudinary.uploader.upload(updateData.pictureURL, {
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
        };
        await models_1.User.update(updateDataComplete, {
            where: {
                id: userId
            },
        });
        return updateDataComplete;
    }
    else {
        console.error("no hay imagen");
    }
}
exports.updateProfile = updateProfile;
async function ubicacion(userId, update) {
    const userProfile = await models_1.User.findByPk(userId);
    if (userProfile) {
        await userProfile.update({
            lat: update.lat,
            lng: update.lng,
            lugar: update.lugar
        });
        return userProfile;
    }
    else {
        console.error("error al dar la ubicacion ");
    }
}
exports.ubicacion = ubicacion;
