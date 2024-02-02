//SQL
import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.HOST',
    port:process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: 'delivery_bot',

  });
  

  sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

export default sequelize;
