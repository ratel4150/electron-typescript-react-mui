// src/db/models/Service.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'services',
    timestamps: false,
  });

  return Service;
};
