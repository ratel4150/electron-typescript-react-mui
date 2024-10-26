// src/db/models/InventoryMovement.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const InventoryMovement = sequelize.define('InventoryMovement', {
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
    tipoMovimiento: {
      type: DataTypes.ENUM('Entrada', 'Salida'),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    tableName: 'inventory_movements',
    timestamps: false,
  });

  return InventoryMovement;
};
