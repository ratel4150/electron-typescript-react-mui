// src/db/models/InventoryKardex.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const InventoryKardex = sequelize.define('InventoryKardex', {
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
    cantidadInicial: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidadEntrante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidadSaliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidadFinal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'inventory_kardex',
    timestamps: false,
  });

  return InventoryKardex;
};
