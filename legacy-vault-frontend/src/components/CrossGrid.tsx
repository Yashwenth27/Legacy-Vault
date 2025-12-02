// [ID: C4G5X9L] - CrossGrid Fixed
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CrossGrid() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Generate crosses ONLY on the client side to avoid hydration errors
    const generatedItems = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100),
      left: Math.floor(Math.random() * 100),
      duration: 15 + Math.random() * 20,
      size: 20 + Math.random() * 30,
    }));
    setItems(generatedItems);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-teal-900/10"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            width: item.size,
            height: item.size,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}