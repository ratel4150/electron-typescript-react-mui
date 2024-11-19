// src/db/models/PaymentHistory.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PaymentHistory = sequelize.define('PaymentHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tickets',
        key: 'id',
      },
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'payment_histories',
    timestamps: false,
  });

  return PaymentHistory;
};
