// src/db/models/DiscountHistory.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const DiscountHistory = sequelize.define('DiscountHistory', {
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
    descuentoAplicado: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'discount_histories',
    timestamps: false,
  });

  return DiscountHistory;
};
