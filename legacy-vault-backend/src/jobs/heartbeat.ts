import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/emailSender'; // <--- Import this

const prisma = new PrismaClient();

export const startHeartbeatService = () => {
  console.log("💓 Heartbeat Service Started...");

  // Running every minute for testing
  cron.schedule('* * * * *', async () => {
    console.log("\n--- 💓 Running Heartbeat Check ---");
    
    const users = await prisma.user.findMany({
      where: { isDead: false },
      include: { nominees: true }
    });

    const now = new Date();

    for (const user of users) {
      // (Your existing deadline logic stays here...)
      const lastSeen = new Date(user.lastHeartbeat);
      const nextCheckIn = new Date(lastSeen);
      nextCheckIn.setDate(lastSeen.getDate() + user.checkInInterval);

      const deathDeadline = new Date(nextCheckIn);
      deathDeadline.setDate(deathDeadline.getDate() + user.gracePeriodDays);

      // SCENARIO 1: DEAD -> Notify Nominees
      if (now > deathDeadline) {
        console.log(`💀 ALERT: User ${user.email} is presumed DEAD.`);
        
        await prisma.user.update({
          where: { id: user.id },
          data: { isDead: true, deadConfirmedAt: new Date() }
        });

        // EMAIL NOMINEES
        for (const nominee of user.nominees) {
          
          // 1. GENERATE LINK
          const accessLink = `http://localhost:3000/nominee/access/${nominee.id}`;
          
          // 2. LOG IT (So we can see if ID exists)
          console.log("------------------------------------------------");
          console.log("🔗 GENERATED LINK:", accessLink); 
          console.log("👤 NOMINEE ID:", nominee.id);
          console.log("------------------------------------------------");

          const message = `
            URGENT: LegacyVault Access Granted.
            
            We regret to inform you that the vault for ${user.email} has been unlocked.
            You are the designated beneficiary.
            
            Click here to access the secure data:
            ${accessLink}
          `;
          
          // 3. SEND
          await sendEmail(nominee.email, "URGENT: Digital Inheritance Access", message);
        }
      }
      
      // SCENARIO 2: LATE -> Warn User
      else if (now > nextCheckIn) {
        console.log(`⚠️ WARNING: User ${user.email} is late.`);
        
        const message = `
          SECURITY CHECK: Are you active?
          
          You have missed your scheduled check-in. 
          If you do not respond within ${user.gracePeriodDays} days, your data will be released to your nominees.
          
          CLICK HERE TO CONFIRM YOU ARE ALIVE:
          http://localhost:3000/api/users/alive?id=${user.id}
        `;
        
        await sendEmail(user.email, "ACTION REQUIRED: Verify your status", message);
      } 
    }
  });
};