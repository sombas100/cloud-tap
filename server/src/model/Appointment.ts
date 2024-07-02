import mongoose, { Schema, Document } from 'mongoose';
 

interface IAppointment extends Document {
    name: string;
    email: string;
    date: Date;
    time: string;
    notified: string;
}

export const AppintmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notified: { type: String, required: true }
})

export const Appointment = mongoose.model<IAppointment>('Appointments', AppintmentSchema);
export default Appointment;