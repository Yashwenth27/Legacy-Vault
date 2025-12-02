// src/controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';
import { welcomeEmail } from '../utils/emailTemplates';
import { sendEmail } from '../utils/emailSender';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, phone, tier } = req.body;

    // 1. Validation
    if (!email || !password) {
      res.status(400).json({ error: "Email and Password are required" });
      return;
    }

    // 2. Hash Password (The Vault Lock)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Create User in Database
    const user = await prisma.user.create({
      data: {
        email,
        phone, // Optional
        passwordHash,
        // If tier is 'DIAMOND', use it. Otherwise default to 'FREE'
        plan: tier === 'DIAMOND' ? 'DIAMOND' : 'FREE', 
      },
    });

    await sendEmail(email, "Welcome to LegacyVault", welcomeEmail(email));

    // 4. Success Response (Don't send the password back!)
    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
      plan: user.plan
    });

  } catch (error: any) {
    // Handle "Unique Constraint" error (User already exists)
    if (error.code === 'P2002') {
      res.status(400).json({ error: "User with this email already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // 2. Check Password
    const validPass = await bcrypt.compare(password, user.passwordHash);
    if (!validPass) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // 3. Generate Token (The "Badge")
    const token = jwt.sign(
      { id: user.id, email: user.email, plan: user.plan },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Badge expires in 1 hour
    );

    // 4. Send it back
    res.json({
      message: "Login successful",
      token: token,
      user: { id: user.id, email: user.email, plan: user.plan }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// src/controllers/userController.ts

// ... other imports ...

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // 1. Get ID from Token
    const userId = req.user.id;

    // 2. Fetch FRESH data from Database (This gets the updated PLAN)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        email: true, 
        plan: true, 
        createdAt: true,
        phone: true
      }
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
  
    // 3. Send fresh data
    res.json({
      message: "Profile fetched",
      user: user // <--- This now has the REAL plan
    });

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};