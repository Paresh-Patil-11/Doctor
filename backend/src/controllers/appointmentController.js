import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    if (!patientId || !doctorId || !date || !time || !reason) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const existingAppointment = await Appointment.findOne({
      where: { 
        doctorId, 
        date, 
        time, 
        status: { [Op.notIn]: ['cancelled', 'rejected'] } 
      }
    });

    if (existingAppointment) {
      return res.status(400).json({ 
        success: false, 
        message: 'This slot is already booked.' 
      });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      reason,
      status: 'pending'
    });

    const createdAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        { 
          model: Patient, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        },
        { 
          model: Doctor, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        }
      ]
    });

    res.status(201).json({ 
      success: true, 
      data: createdAppointment, 
      message: 'Appointment booked successfully!' 
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { 
          model: Patient, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        },
        { 
          model: Doctor, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes, prescription } = req.body;

    const appointment = await Appointment.findByPk(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    await appointment.update({ status, notes, prescription });

    const updatedAppointment = await Appointment.findByPk(req.params.id, {
      include: [
        { 
          model: Patient, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        },
        { 
          model: Doctor, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
        }
      ]
    });

    res.json({ 
      success: true, 
      data: updatedAppointment, 
      message: `Appointment ${status} successfully` 
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.params.id;
    
    const patient = await Patient.findOne({ where: { userId: patientId } });
    
    if (!patient) {
      return res.json({ success: true, data: [] });
    }

    const appointments = await Appointment.findAll({
      where: { patientId: patient.id },
      include: [
        { 
          model: Doctor, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }],
          attributes: ['id', 'specialization', 'consultationFee']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Get patient appointments error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorUserId = req.params.id;
    
    const doctor = await Doctor.findOne({ where: { userId: doctorUserId } });
    
    if (!doctor) {
      return res.json({ success: true, data: [] });
    }

    const appointments = await Appointment.findAll({
      where: { doctorId: doctor.id },
      include: [
        { 
          model: Patient, 
          include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }],
          attributes: ['id', 'age', 'gender']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Get doctor appointments error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};