// src/db/models/TrainingProgram.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const TrainingProgram = sequelize.define('TrainingProgram', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'training_programs',
    timestamps: false,
  });

  return TrainingProgram;
};
