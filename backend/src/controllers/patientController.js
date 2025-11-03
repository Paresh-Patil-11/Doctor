import Patient from '../models/Patient.js';
import User from '../models/User.js';
import { sequelize } from '../config/database.js';

// Get patient profile including user details
export const getPatientProfile = async (req, res) => {
  try {
    // req.params.id is the USER ID, not patient ID
    const patient = await Patient.findOne({
      where: { userId: req.params.id }, // Find by userId
      include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    console.error('Get patient profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update patient profile and associated user details
export const updatePatientProfile = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, phone, email, age, gender, bloodGroup, emergencyContact } = req.body;
    
    // req.params.id is the USER ID
    const patient = await Patient.findOne({ where: { userId: req.params.id } });

    if (!patient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // 1. Update User info
    await User.update(
      { name, phone, email }, 
      { where: { id: req.params.id }, transaction }
    );
    
    // 2. Update Patient info
    await patient.update(
      { age, gender, bloodGroup, emergencyContact }, 
      { transaction }
    );
    
    await transaction.commit();
    res.json({ success: true, message: 'Patient profile updated' });
  } catch (error) {
    await transaction.rollback();
    console.error('Update patient profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get medical history (uses JSONB field, sent directly)
export const getMedicalHistory = async (req, res) => {
  try {
    // req.params.id is the USER ID
    const patient = await Patient.findOne({
      where: { userId: req.params.id },
      attributes: ['medicalHistory']
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    
    res.json({ success: true, data: patient.medicalHistory });
  } catch (error) {
    console.error('Get medical history error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};