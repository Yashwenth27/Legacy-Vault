// src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { startHeartbeatService } from './jobs/heartbeat';
import nomineeRoutes from './routes/nomineeRoutes';

// IMPORT ROUTES
import userRoutes from './routes/userRoutes';
import vaultRoutes from './routes/vaultRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// USE ROUTES
app.use('/api/users', userRoutes);
app.use('/nominee', nomineeRoutes);
app.use('/api/vault', vaultRoutes);

// HEALTH CHECK ROUTE
// We explicitly use 'express.Request' and 'express.Response' here

//ycom sqxe mcaw rhdg
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ 
    status: 'active', 
    message: 'LegacyVault API is running',
    timestamp: new Date()
  });
});

startHeartbeatService();

// START SERVER
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
});