"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("./connection");
class Pet extends sequelize_1.Model {
}
exports.Pet = Pet;
Pet.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    lng: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    pictureURL: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lugar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: connection_1.sequelize, modelName: "pet" });
