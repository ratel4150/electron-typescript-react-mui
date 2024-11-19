// src/db/models/Cashier.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Cashier = sequelize.define('Cashier', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'cashiers',
    timestamps: false,
  });

  return Cashier;
};
