// src/db/models/LoyaltyProgram.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const LoyaltyProgram = sequelize.define('LoyaltyProgram', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puntosPorCompra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descuentoPorPuntos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'loyalty_programs',
    timestamps: false,
  });

  return LoyaltyProgram;
};
