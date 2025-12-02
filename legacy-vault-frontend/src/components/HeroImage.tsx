"use client";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-md drop-shadow-2xl"
      >
        {/* BACKGROUND GLOW */}
        <circle cx="200" cy="200" r="160" fill="url(#hero_glow)" fillOpacity="0.1" />
        
        {/* ORBITAL RINGS (Animated) */}
        <motion.circle 
          cx="200" cy="200" r="140" 
          stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />
        <motion.circle 
          cx="200" cy="200" r="110" 
          stroke="#0f172a" strokeWidth="1" strokeOpacity="0.1"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />

        {/* CENTRAL VAULT SHIELD */}
        <motion.g
          initial={{ y: 10 }}
          animate={{ y: -10 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          {/* Shield Body */}
          <path
            d="M200 40C150 40 100 60 70 80V180C70 260 120 320 200 360C280 320 330 260 330 180V80C300 60 250 40 200 40Z"
            fill="url(#shield_gradient)"
            stroke="#0f172a"
            strokeWidth="4"
          />
          
          {/* Inner Lock Mechanism */}
          <circle cx="200" cy="180" r="50" fill="#0f172a" />
          <circle cx="200" cy="180" r="40" stroke="#2dd4bf" strokeWidth="3" />
          
          {/* Keyhole */}
          <path
            d="M200 165V185M200 195V195.01"
            stroke="#fbbf24"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Digital Dots on Shield */}
          <circle cx="150" cy="120" r="4" fill="#2dd4bf" fillOpacity="0.5" />
          <circle cx="250" cy="120" r="4" fill="#2dd4bf" fillOpacity="0.5" />
          <circle cx="150" cy="240" r="4" fill="#2dd4bf" fillOpacity="0.5" />
          <circle cx="250" cy="240" r="4" fill="#2dd4bf" fillOpacity="0.5" />
        </motion.g>

        {/* FLOATING DATA PARTICLES */}
        <motion.rect x="60" y="100" width="40" height="50" rx="4" fill="#fff" stroke="#cbd5e1" strokeWidth="2"
           animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0 }} 
        />
        <motion.rect x="310" y="140" width="30" height="30" rx="8" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="2"
           animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.path d="M300 280 L340 300 L300 320 Z" fill="#0f172a" opacity="0.1"
           animate={{ x: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}
        />

        {/* GRADIENTS */}
        <defs>
          <linearGradient id="shield_gradient" x1="200" y1="40" x2="200" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#f1f5f9" />
          </linearGradient>
          <radialGradient id="hero_glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
            <stop stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}