import * as dotenv from "dotenv"
dotenv.config()

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dz0ody222', 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});



export {cloudinary}
