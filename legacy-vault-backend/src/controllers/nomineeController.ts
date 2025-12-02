import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import { sendEmail } from '../utils/emailSender';
import { nomineeInviteEmail } from '../utils/emailTemplates';

const prisma = new PrismaClient();

// Add a Nominee
// src/controllers/nomineeController.ts

// ... imports remain the same

export const addNominee = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, phone, relationship } = req.body;
    
    // Check if user is logged in
    if (!req.user || !req.user.id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;

    if (!name || !email || !relationship) {
      res.status(400).json({ error: "Name, Email and Relationship are required" });
      return;
    }

    // 1. Save to DB
    const nominee = await prisma.nominee.create({
      data: { userId, name, email, phone, relationship }
    });

    // 2. Notify the Nominee (WRAPPED IN TRY-CATCH)
    // This ensures that if email fails, the nominee is still added.
    try {
      await sendEmail(
        email, 
        "You have been named a beneficiary", 
        nomineeInviteEmail(req.user.email, name)
      );
      console.log(`Email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send email, but nominee was added:", emailError);
      // We continue without throwing an error
    }

    res.status(201).json({ message: "Nominee added successfully", nominee });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add nominee" });
  }
};

// ... rest of the file remains the same

export const getNominees = async (req: AuthRequest, res: Response) => {
  const nominees = await prisma.nominee.findMany({ where: { userId: req.user.id } });
  res.json(nominees);
};

export const accessLegacy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // The Nominee ID from the URL

    // 1. Find the Nominee & The User
    const nominee = await prisma.nominee.findUnique({
      where: { id },
      include: { user: true } // Load the User data too
    });

    if (!nominee) {
      res.status(404).json({ error: "Invalid Access Link" });
      return;
    }

    // 2. SECURITY CHECK: Is the User actually dead?
    // This prevents a nominee from guessing the ID and stealing data early.
    if (!nominee.user.isDead) {
      console.warn(`SECURITY ALERT: Nominee ${nominee.email} tried to access vault of LIVING user.`);
      res.status(403).json({ error: "Access Denied. The user is still active." });
      return;
    }

    // 3. FETCH THE VAULT (Encrypted)
    const vaultItems = await prisma.vaultItem.findMany({
      where: { userId: nominee.userId }
    });

    // 4. Grant Access (Log it)
    await prisma.nominee.update({
      where: { id },
      data: { accessGranted: true }
    });

    res.json({
      message: "Access Granted. Identity Verified.",
      owner: nominee.user.email,
      vault: vaultItems // The Nominee now has the encrypted blobs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
