import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";


export class Pet extends Model {}

Pet.init({
  name: DataTypes.STRING, 
  bio: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  pictureURL: DataTypes.STRING,
  lugar: DataTypes.STRING
  
}, 


{ sequelize, modelName: "pet"});
