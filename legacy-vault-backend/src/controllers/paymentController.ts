import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Initialize Razorpay (Still needed if you ever go live, but unused for mock)
// We add '|| ""' to prevent crashes if env vars are missing during dev
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "mock_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret",
});

// 1. CREATE ORDER (Still useful to generate a real order ID if needed, but skipped in mock frontend)
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    
    const options = {
      amount: 49900, // ₹499.00
      currency: "INR",
      receipt: `receipt_${userId.substring(0, 10)}`,
      notes: { userId }
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Could not create payment order" });
  }
};

// 2. VERIFY PAYMENT (Updated with Mock Logic)
export const verifyPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user.id;

    // --- MOCK BYPASS LOGIC ---
    if (razorpay_signature === "mock_signature_bypass") {
      console.log(`💎 MOCK PAYMENT DETECTED for User ${userId}`);
      
      // Upgrade User immediately
      await prisma.user.update({
        where: { id: userId },
        data: { plan: 'DIAMOND' }
      });

      res.json({ success: true, message: "Mock Upgrade successful" });
      return; // Stop here
    }
    // -------------------------

    // STANDARD REAL VALIDATION (For when you go Live)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      res.status(400).json({ error: "Invalid Payment Signature" });
      return;
    }

    // Upgrade User (Real)
    await prisma.user.update({
      where: { id: userId },
      data: { plan: 'DIAMOND' }
    });

    res.json({ success: true, message: "Upgrade successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};