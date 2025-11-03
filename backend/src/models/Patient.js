import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { 
    type: DataTypes.ENUM('male', 'female', 'other'), 
    allowNull: false 
  },
  bloodGroup: { type: DataTypes.STRING },
  allergies: { type: DataTypes.JSONB, defaultValue: [] }, 
  medicalHistory: { type: DataTypes.JSONB, defaultValue: [] },
  emergencyContact: { type: DataTypes.JSONB },
}, { 
  timestamps: true,
  tableName: 'patients'
});

Patient.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Patient, { foreignKey: 'userId' });

export default Patient;