import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";


export class Pet extends Model {}

Pet.init({
  name:{
   type: DataTypes.STRING,
    allowNull: false
  },
  bio:{
   type: DataTypes.STRING,
   allowNull: false
  }, 
    
  lat:{
    type: DataTypes.FLOAT,
    allowNull: false
  }, 
  lng:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
    
  pictureURL:{

    type: DataTypes.STRING,
    allowNull: false

  }, 
  
  lugar:{
   type: DataTypes.STRING,
   allowNull: false
  } 
  
}, 


{ sequelize, modelName: "pet"});
