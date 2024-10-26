// src/db/models/Ticket.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Ticket = sequelize.define('Ticket', {
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
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'id',
      },
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'tickets',
    timestamps: false,
  });

  return Ticket;
};
