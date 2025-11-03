import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { 
  getDoctors, 
  getDoctorById, 
  getDoctorByUserId, 
  updateDoctorProfile, 
  deleteDoctor, 
  updateAvailability,
  getAllAvailableSlots 
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.get('/user/:userId', getDoctorByUserId);

router.use(protect);
router.put('/:id/profile', authorize('doctor', 'admin'), updateDoctorProfile);
router.put('/:id/availability', authorize('doctor'), updateAvailability);
router.get('/:id/slots', getAllAvailableSlots);
router.delete('/:id', authorize('admin'), deleteDoctor);

export default router;
