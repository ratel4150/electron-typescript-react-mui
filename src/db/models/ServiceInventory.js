// src/db/models/ServiceInventory.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ServiceInventory = sequelize.define('ServiceInventory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    servicioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'services',
        key: 'id',
      },
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'service_inventories',
    timestamps: false,
  });

  return ServiceInventory;
};
