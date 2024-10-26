// src/db/models/CustomerHistory.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const CustomerHistory = sequelize.define('CustomerHistory', {
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
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    actividad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'customer_histories',
    timestamps: false,
  });

  return CustomerHistory;
};
