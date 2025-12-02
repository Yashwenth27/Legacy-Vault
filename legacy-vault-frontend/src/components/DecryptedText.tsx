"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

export default function DecryptedText({ text, className }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);
  const iterations = useRef(0);

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;
    let loopInterval: NodeJS.Timeout;

    // The function that runs the scramble effect once
    const runAnimation = () => {
      iterations.current = 0; // Reset progress
      setIsScrambling(true);

      // Clear any running animation to prevent overlaps
      if (animationInterval) clearInterval(animationInterval);

      animationInterval = setInterval(() => {
        setDisplayText((prev) =>
          text // We map based on the *original* text length
            .split("")
            .map((char, index) => {
              if (index < iterations.current) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );

        if (iterations.current >= text.length) {
          setIsScrambling(false);
          clearInterval(animationInterval);
        }

        iterations.current += 1 / 3; // Controls speed of reveal
      }, 30);
    };

    // 1. Run immediately on mount
    runAnimation();

    // 2. Run every 5 seconds
    loopInterval = setInterval(runAnimation, 5000);

    // Cleanup
    return () => {
      clearInterval(animationInterval);
      clearInterval(loopInterval);
    };
  }, [text]);

  return (
    <motion.span className={className}>
      {displayText}
    </motion.span>
  );
}