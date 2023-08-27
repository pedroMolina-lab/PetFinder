"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const dotenv = require("dotenv");
dotenv.config();
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
cloudinary_1.v2.config({
    cloud_name: 'dz0ody222',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
