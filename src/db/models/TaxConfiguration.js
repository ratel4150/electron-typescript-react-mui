// src/db/models/TaxConfiguration.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const TaxConfiguration = sequelize.define('TaxConfiguration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoImpuesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'tax_configurations',
    timestamps: false,
  });

  return TaxConfiguration;
};
