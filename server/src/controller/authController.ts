import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User, { IUser } from "../model/user";

export const generateToken = (user: IUser) => {
    const token = jwt.sign(
        {id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h'}
    );
    return token;
};

export const register = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user = new User({
            username,
            password: hashedPassword,
            role
        })
        await user.save();
        const token = generateToken(user);
        res.status(201).json({ token })
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password }= req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
