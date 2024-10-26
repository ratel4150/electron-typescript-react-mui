import Sales from './salesDB.js';

export default (sequelize) => ({
    Sales: Sales(sequelize),
  
  });
  