// src/db/setupDB.js
import { Sequelize } from 'sequelize';
import initializeModels from './models/index.js'; // Importa la inicialización de modelos
import  initAssociations  from './associations.js'; // Importa las asociaciones

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/database.sqlite', // Ubicación de la base de datos
});

// Inicializa los modelos
const models = initializeModels(sequelize);
console.log(models);


// Establece las asociaciones entre los modelos
// Set up associations
initAssociations(models);

// Función para sincronizar todos los modelos y crear las tablas
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos.');
    
    await sequelize.sync({ alter: true }); // Sincronizar modelos
    console.log('Tablas sincronizadas.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

// Inicializa la base de datos
initializeDatabase();

export { sequelize, models, initializeDatabase };