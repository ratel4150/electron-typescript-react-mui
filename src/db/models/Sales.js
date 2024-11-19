// src/db/models/salesDB.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Sales = sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    cashierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cashiers', // nombre de la tabla referenciada
        key: 'id',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customers', // nombre de la tabla referenciada
        key: 'id',
      },
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'completed', // valores posibles: 'completed', 'pending', 'refunded', etc.
    },
  }, {
    tableName: 'sales',
    timestamps: true, // Añade createdAt y updatedAt
    underscored: true, // usa snake_case para los nombres de columna
  });

  return Sales;
};
