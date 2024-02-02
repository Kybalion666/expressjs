//SQL
import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'woxsanam2015',
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