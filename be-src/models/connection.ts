import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres://qxosxbpf:MIZOjTpIl2Nnd7KPEqpZLgHZ8FdpwjVC@motty.db.elephantsql.com/qxosxbpf");

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
  