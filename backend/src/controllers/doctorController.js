import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { sequelize } from '../config/database.js';

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    // Changed to find by userId instead of doctor id
    const doctor = await Doctor.findOne({
      where: { userId: req.params.id },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
    });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { userId: req.params.userId },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
    });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, phone, email, specialization, qualification, experience, consultationFee } = req.body;
    
    // Find doctor by userId (which comes from req.params.id)
    const doctor = await Doctor.findOne({ where: { userId: req.params.id } });
    
    if (!doctor) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    
    // Update User info
    await User.update(
      { name, phone, email }, 
      { where: { id: doctor.userId }, transaction }
    );
    
    // Update Doctor info
    await doctor.update(
      { specialization, qualification, experience, consultationFee }, 
      { transaction }
    );
    
    await transaction.commit();
    res.json({ success: true, message: 'Doctor profile updated successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const [rowsUpdated, [updatedDoctor]] = await Doctor.update(
      { availability },
      { where: { id: req.params.id }, returning: true }
    );
    if (rowsUpdated === 0) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: updatedDoctor, message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllAvailableSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, { attributes: ['availability'] });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor.availability });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    const deleted = await User.destroy({ where: { id: doctor.userId }, transaction });
    if (deleted === 0) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await transaction.commit();
    res.json({ success: true, message: 'Doctor and associated user deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: error.message });
  }
};