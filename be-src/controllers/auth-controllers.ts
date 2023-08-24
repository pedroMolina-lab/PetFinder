import { Auth } from "../models/auth";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { User } from "../models";

const SECRET = "fojesdjfop";

function calculateSHA256Hash(original) {
  const sha256Hash = crypto.createHash("sha256");
  sha256Hash.update(original);
  return sha256Hash.digest("hex");
}



export async function createAuth(userData) {
  try {
    const { email, name, lastname, password } = userData;
    const hashedPassword = calculateSHA256Hash(password);

    

    const [auth, created] = await Auth.findOrCreate({
      where: { email },
      defaults: {
        email,
        name,
        lastname,
        password: hashedPassword,
      },
    });

    const [user, createdUser] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        user_id: auth.get("id")
      },
    });
    
    return [created, auth, user];
    
    } catch (error) {
    throw error;
  }
}

export async function logInUser(data) {
  try {
    const { email, password } = data;
    const hashedPassword = calculateSHA256Hash(password);

    const user = await Auth.findOne({
      where: { email, password: hashedPassword },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try{
      const decodedToken = jwt.verify(token, SECRET);
      console.log(decodedToken);
      


      req._user = decodedToken
      next()
    }catch(e){
      res.status(401).json({error: true})

    }


}
