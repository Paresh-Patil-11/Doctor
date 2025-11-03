import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Doctor = sequelize.define('Doctor', {
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
  specialization: { type: DataTypes.STRING, allowNull: false },
  qualification: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.INTEGER, allowNull: false },
  consultationFee: { type: DataTypes.FLOAT, allowNull: false },
  availability: { type: DataTypes.JSONB, defaultValue: [] },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
}, { 
  timestamps: true,
  tableName: 'doctors'
});

Doctor.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Doctor, { foreignKey: 'userId' });

export default Doctor;