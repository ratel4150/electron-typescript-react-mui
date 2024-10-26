// src/db/models/Session.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Session = sequelize.define('Session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'sessions',
    timestamps: false,
  });

  return Session;
};
