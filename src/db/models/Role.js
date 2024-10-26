// src/db/models/Role.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permisos: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  return Role;
};
