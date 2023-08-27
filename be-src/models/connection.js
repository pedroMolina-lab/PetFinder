"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv = require("dotenv");
dotenv.config();
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.SQL_CONN, {
    dialect: "postgres"
});
(async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
