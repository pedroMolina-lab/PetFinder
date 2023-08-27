"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("./connection");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    lng: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    lugar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize: connection_1.sequelize, modelName: "user" });
