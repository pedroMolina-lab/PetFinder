import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Auth extends Model {}
Auth.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },

}, 


{ sequelize, modelName: "auth"});
