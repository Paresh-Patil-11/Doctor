import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { 
    getPatientProfile, 
    updatePatientProfile, 
    getMedicalHistory 
} from '../controllers/patientController.js';

const router = express.Router();

router.use(protect);
router.get('/profile/:id', authorize('patient', 'admin'), getPatientProfile);
router.put('/profile/:id', authorize('patient', 'admin'), updatePatientProfile);
router.get('/history/:id', authorize('patient', 'doctor', 'admin'), getMedicalHistory);

export default router;