import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import { sequelize } from '../config/database.js';

const seedDoctor = async () => {
  try {
    await sequelize.sync();

    const existingDoctor = await User.findOne({ where: { email: 'yesimdoctor@gmail.com' } });
    
    if (existingDoctor) {
      console.log('Doctor account already exists');
      return;
    }

    const doctorUser = await User.create({
      name: 'Dr. John Smith',
      email: 'yesimdoctor@gmail.com',
      password: 'yesimdoctor@in',
      phone: '+1234567890',
      role: 'doctor',
      isActive: true
    });

    await Doctor.create({
      userId: doctorUser.id,
      specialization: 'General Medicine',
      qualification: 'MBBS, MD',
      experience: 10,
      consultationFee: 500,
      availability: [
        { day: 'Monday', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { day: 'Tuesday', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { day: 'Wednesday', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { day: 'Thursday', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { day: 'Friday', slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] }
      ],
      rating: 4.5
    });

    console.log('✅ Doctor account created successfully');
    console.log('Email: yesimdoctor@gmail.com');
    console.log('Password: yesimdoctor@in');
    
  } catch (error) {
    console.error('Error seeding doctor:', error);
  }
};

export default seedDoctor;