// src/db/models/TicketDetail.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const TicketDetail = sequelize.define('TicketDetail', {
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
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    importe: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'ticket_details',
    timestamps: false,
  });

  return TicketDetail;
};
