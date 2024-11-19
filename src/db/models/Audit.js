// src/db/models/Audit.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Audit = sequelize.define('Audit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
  }, {
    tableName: 'audits',
    timestamps: false,
  });

  return Audit;
};
