// src/db/models/AlertConfiguration.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const AlertConfiguration = sequelize.define('AlertConfiguration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoAlerta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    umbral: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'alert_configurations',
    timestamps: false,
  });

  return AlertConfiguration;
};
