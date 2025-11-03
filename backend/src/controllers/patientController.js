import Patient from '../models/Patient.js';
import User from '../models/User.js';
import { sequelize } from '../config/database.js';

// Get patient profile including user details
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update patient profile and associated user details
export const updatePatientProfile = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, phone, email, ...patientFields } = req.body;
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // 1. Update User info
    await User.update({ name, phone, email }, { where: { id: patient.userId }, transaction });
    
    // 2. Update Patient info
    await patient.update(patientFields, { transaction });
    
    await transaction.commit();
    res.json({ success: true, message: 'Patient profile updated' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get medical history (uses JSONB field, sent directly)
export const getMedicalHistory = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id, {
            attributes: ['medicalHistory']
        });

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        
        res.json({ success: true, data: patient.medicalHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};