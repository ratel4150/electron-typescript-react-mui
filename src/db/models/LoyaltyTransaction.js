// src/db/models/LoyaltyTransaction.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const LoyaltyTransaction = sequelize.define('LoyaltyTransaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'id',
      },
      allowNull: false,
    },
    puntos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'loyalty_transactions',
    timestamps: false,
  });

  return LoyaltyTransaction;
};
