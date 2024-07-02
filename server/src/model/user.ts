import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    password: string;
    role: string;
}

export const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user'  }
})

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;