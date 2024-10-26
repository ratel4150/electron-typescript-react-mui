// src/db/models/GeneralConfiguration.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const GeneralConfiguration = sequelize.define('GeneralConfiguration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreNegocio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'general_configurations',
    timestamps: false,
  });

  return GeneralConfiguration;
};
