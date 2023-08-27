import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init({

  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
  lugar: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, 


{ sequelize, modelName: "user"});
