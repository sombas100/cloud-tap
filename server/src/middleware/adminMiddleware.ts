import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload; 
        }
    }
}


export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token found.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Acess denied. Admins only' });  
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }


}