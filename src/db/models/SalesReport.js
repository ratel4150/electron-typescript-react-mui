// src/db/models/SalesReport.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const SalesReport = sequelize.define('SalesReport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalVentas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'sales_reports',
    timestamps: false,
  });

  return SalesReport;
};
