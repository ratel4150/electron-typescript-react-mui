import { Sequelize } from 'sequelize';
import initializeModels from './models/index.js';
/* import Inventory from './models/inventoryDB.js';
import Auth from './models/authDB.js';
import Customers from './models/customersDB.js'; */

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/database.sqlite', // Ubicación de la base de datos
});

const models = initializeModels(sequelize);

// Función para sincronizar todos los modelos y crear las tablas
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos.');
    await sequelize.sync(); // Sincronizar modelos
    console.log('Tablas sincronizadas.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};
initializeDatabase();
export { sequelize, models, initializeDatabase };