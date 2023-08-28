import * as dotenv from "dotenv"
dotenv.config()

import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(process.env.SQL_CONN,{
    dialect: "postgres"
});   

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();