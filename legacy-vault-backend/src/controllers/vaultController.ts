// src/controllers/vaultController.ts
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// 1. ADD A NEW SECRET
// src/controllers/vaultController.ts

export const addVaultItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // 1. Accept 'mimeType' from the request
    const { name, encryptedBlob, iv, mimeType } = req.body; 
    const userId = req.user.id;

    if (!name || !encryptedBlob || !iv) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // 2. Save it
    const newItem = await prisma.vaultItem.create({
      data: {
        userId,
        name,
        encryptedBlob,
        iv,
        // Default to text if they don't send a type
        mimeType: mimeType || "text/plain", 
      },
    });

    res.status(201).json({ message: "Item saved", item: newItem });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save item" });
  }
};

// 2. GET ALL SECRETS (Encrypted)
export const getVaultItems = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const items = await prisma.vaultItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(items);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vault" });
  }
};