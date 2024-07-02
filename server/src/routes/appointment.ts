import express from 'express';
import { createAppointment,
    getAllAppointments, 
    updateAppointment, 
    getAppointmentById,
    deleteAppointment,
    getNotifications,
    markAsNotified,
 } from '../controller/appointmentController';

 const router = express.Router();

 router.post('/', createAppointment);
 router.get('/', getAllAppointments);
 router.get('/:id', getAppointmentById);
 router.put('/:id', updateAppointment);
 router.delete('/:id', deleteAppointment);
 router.get('/notifications', getNotifications);
 router.put('/notifications/:id', markAsNotified);

 export default router;