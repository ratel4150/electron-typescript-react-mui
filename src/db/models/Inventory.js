// src/db/models/Inventory.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'inventories',
    timestamps: false,
  });

  return Inventory;
};
