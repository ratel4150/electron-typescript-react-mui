// src/db/models/CashClosure.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const CashClosure = sequelize.define('CashClosure', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cajeroId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cashiers',
        key: 'id',
      },
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    totalVentas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalEfectivo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'cash_closures',
    timestamps: false,
  });

  return CashClosure;
};
