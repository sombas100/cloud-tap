import express from 'express';
import { createAppointment,
    getAllAppointments, 
    updateAppointment, 
    getAppointmentById,
    deleteAppointment,
    getNotifications,
    markAsNotified,
 } from '../controller/appointmentController';
 import { adminMiddleware } from '../middleware/adminMiddleware';

 const router = express.Router();

 router.post('/',adminMiddleware, createAppointment);
 router.get('/', adminMiddleware, getAllAppointments);
 router.get('/:id', adminMiddleware,  getAppointmentById);
 router.put('/:id', adminMiddleware, updateAppointment);
 router.delete('/:id', adminMiddleware, deleteAppointment);
 router.get('/notifications', getNotifications);
 router.put('/notifications/:id', markAsNotified);

 export default router;