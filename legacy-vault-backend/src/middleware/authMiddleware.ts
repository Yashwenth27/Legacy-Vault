// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// This extends the standard Request to include "user" data
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token;

  // 1. Check if the header has "Authorization: Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token string (remove "Bearer " part)
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      // 3. Add user info to the request object so the next function can use it
      req.user = decoded;

      next(); // Pass control to the next function (the Controller)
    } catch (error) {
      res.status(401).json({ error: "Not authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
    return;
  }
};