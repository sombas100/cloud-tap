

import Appointment from "../model/Appointment";
import { Request, Response } from "express";

export const createAppointment = async (req: Request, res: Response) => {
    const { name, email, date, time, notified } = req.body;

    try {
        const newAppointment = new Appointment({ 
            name, 
            email, 
            date, 
            time,
            notified: false
        });

        if (!newAppointment) {
            return res.status(404).json({ message: 'Appointment not found'})
        }

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message})
    }
};

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find();

        if (!appointments) {
            return res.status(404).json({ message: 'Appointments not found'});
        }

        res.status(200).json(appointments)
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        let appointment = await Appointment.findById(id, req.body, { new: true })

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, date,time, notified } = req.body;

    try {
        
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, 
            { name, email, date, time, notified },
            { new: true }
        );
    
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
    
        res.status(200).json(updatedAppointment);
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
};

export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json({ message: 'Appointment deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Appointment.find({ notified: false });
        res.status(200).json(notifications);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const markAsNotified = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { notified: true }, { new: true });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};