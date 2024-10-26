// src/db/models/Promotion.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Promotion = sequelize.define('Promotion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'promotions',
    timestamps: false,
  });

  return Promotion;
};
