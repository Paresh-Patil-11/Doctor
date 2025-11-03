import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { 
    createAppointment, 
    getAppointments, 
    updateAppointmentStatus, 
    getDoctorAppointments, 
    getPatientAppointments 
} from '../controllers/appointmentController.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('patient'), createAppointment);
router.get('/', authorize('admin'), getAppointments); // Admin gets all
router.get('/patient/:id', authorize('patient', 'admin'), getPatientAppointments);
router.get('/doctor/:id', authorize('doctor', 'admin'), getDoctorAppointments);
router.put('/:id/status', authorize('doctor', 'admin'), updateAppointmentStatus);

export default router;