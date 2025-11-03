import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  patientId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Patient, key: 'id' }
  },
  doctorId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Doctor, key: 'id' }
  },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false }, 
  status: { 
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed', 'cancelled'), 
    defaultValue: 'pending' 
  },
  reason: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT },
  prescription: { type: DataTypes.TEXT },
}, { 
  timestamps: true,
  tableName: 'appointments'
});

Appointment.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });

export default Appointment;