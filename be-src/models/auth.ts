import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Auth extends Model {}
Auth.init({
  name: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING, 
  password: DataTypes.STRING,
  user_id: DataTypes.INTEGER
}, 


{ sequelize, modelName: "auth"});
