"use client";
import { motion } from "framer-motion";

export default function ProblemImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-md"
      >
        {/* Background Grid (Distorted) */}
        <path d="M40 260H360" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M80 40V260" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        <path d="M320 40V260" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />

        {/* MAIN FILE FOLDER (Locked) */}
        <path
          d="M100 80H160L180 100H300C311 100 320 109 320 120V220C320 231 311 240 300 240H100C89 240 80 231 80 220V100C80 89 89 80 100 80Z"
          fill="#f1f5f9"
          stroke="#94a3b8"
          strokeWidth="4"
        />

        {/* RED PADLOCK (Pulsing) */}
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="160" y="140" width="80" height="60" rx="8" fill="#ef4444" />
          <path d="M180 140V120C180 108.954 188.954 100 200 100C211.046 100 220 108.954 220 120V140" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <circle cx="200" cy="170" r="6" fill="white" />
          <path d="M200 170V185" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        {/* BROKEN LINKS (Floating 'X's) */}
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
          <path d="M340 80 L360 100 M360 80 L340 100" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        </motion.g>
        
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>
          <path d="M40 200 L60 220 M60 200 L40 220" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        {/* QUESTION MARK (Confusion) */}
        <text x="250" y="70" fontSize="60" fill="#94a3b8" fontWeight="bold" opacity="0.3">?</text>

      </svg>
    </div>
  );
}