# 🛡️ LegacyVault

### Secure. Automated. Eternal.
**The "Dead Man's Switch" for your Digital Legacy.**

![Status](https://img.shields.io/badge/Status-Beta-blue)
![Security](https://img.shields.io/badge/Encryption-AES--256-green)
![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Node%20%7C%20PostgreSQL-teal)

---

## 🚨 The Problem
**₹1.5 Lakh Crore ($18B+)** lies unclaimed in Indian banks and insurance firms.
Why? Because death is sudden. When a digital breadwinner passes away, their families are often locked out of bank accounts, crypto wallets, and trading apps because they don't know the passwords.

## 💡 The Solution
**LegacyVault** is an automated digital inheritance protocol.
1.  **You Upload Secrets:** Bank details, crypto keys, and documents are encrypted **on your device** (Client-Side) before uploading. We cannot read them.
2.  **We Check On You:** Our "Heartbeat Engine" pings you via Email & WhatsApp periodically.
3.  **The Trigger:** If you stop responding (after a grace period), we assume the worst.
4.  **The Handover:** Your encrypted vault is automatically released to your designated **Nominee**.
5.  **The Key:** The Nominee uses a physical **QR Master Key** (which only they possess) to decrypt and access the assets.

---

## ⚡ Key Features

* **🔒 Zero-Knowledge Architecture:** Data is encrypted with **AES-256-GCM** using a key derived from your password/master key. The server only sees gibberish.
* **💓 Automated Heartbeat:** Configurable check-in intervals (e.g., every 30 days).
* **⏳ Grace Period:** Built-in safety buffer (e.g., 7 days) to prevent false alarms.
* **🔑 Physical Recovery Key:** A printable/physical QR code allows beneficiaries to unlock data without needing your login credentials.
* **👨‍👩‍👧 Nominee Management:** Add multiple beneficiaries with specific relationship tags.
* **📄 Multi-Format Support:** Securely store Text Notes, PDF Documents, and Images.

---

## 🛠️ Tech Stack

### **Frontend (The Face)**
| Tech | Usage |
| :--- | :--- |
| **Next.js 14** | App Router, Server Components |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling & Responsive Design |
| **Framer Motion** | Animations & Micro-interactions |
| **Web Crypto API** | Native Browser Encryption (No external libs) |

### **Backend (The Brain)**
| Tech | Usage |
| :--- | :--- |
| **Node.js / Express** | REST API |
| **Prisma ORM** | Database Management |
| **PostgreSQL** | Primary Database (Supabase) |
| **Node-Cron** | Scheduling the Heartbeat Engine |
| **Nodemailer** | Email Notifications |
| **JWT** | Stateless Authentication |

---

