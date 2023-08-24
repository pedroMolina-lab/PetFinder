import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init({

  email: DataTypes.STRING, 
  user_id: DataTypes.INTEGER,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  lugar: DataTypes.STRING
  
}, 


{ sequelize, modelName: "user"});
