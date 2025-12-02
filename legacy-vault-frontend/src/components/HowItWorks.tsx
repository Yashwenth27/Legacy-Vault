"use client";

import { motion } from "framer-motion";
import { Database, Activity, AlertTriangle, Send, ArrowDown } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Secure Setup",
    desc: "Your data is encrypted locally. Only you hold the keys initially.",
    icon: <Database size={28} />,
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    delay: 0.2
  },
  {
    id: 2,
    title: "Active Monitoring",
    desc: "We periodically check for your presence via secure pings.",
    icon: <Activity size={28} />,
    color: "bg-teal-600",
    lightColor: "bg-teal-50",
    textColor: "text-teal-600",
    delay: 0.4
  },
  {
    id: 3,
    title: "Trigger Event",
    desc: "If you don't respond, the failsafe timer begins countdown.",
    icon: <AlertTriangle size={28} />,
    color: "bg-amber-600",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
    delay: 0.6
  },
  {
    id: 4,
    title: "Legacy Transfer",
    desc: "Keys are released to your nominees automatically.",
    icon: <Send size={28} />,
    color: "bg-emerald-600",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    delay: 0.8
  }
];

export default function HowItWorks() {
  return (
    <div className="relative py-16 w-full max-w-7xl mx-auto">
      
      {/* 1. THE DATA STREAM (Desktop Only) */}
      <div className="hidden md:block absolute top-[88px] left-[10%] right-[10%] h-1.5 bg-slate-100 rounded-full overflow-hidden z-0">
        {/* The moving packet of data */}
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-teal-400 to-transparent blur-sm"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: step.delay }}
            className="flex flex-col items-center group relative"
          >
            {/* 2. THE BEACON (Icon) */}
            <div className="relative mb-8">
              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-20 h-20 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-xl relative z-20 cursor-pointer`}
              >
                {step.icon}
              </motion.div>
              
              {/* Radar Pulse Effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl ${step.color} z-10`}
                animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: index * 0.5 }}
              />
              
              {/* Mobile Connector Arrow (Hidden on Desktop) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 text-slate-300">
                  <ArrowDown size={24} className="animate-bounce opacity-50" />
                </div>
              )}
            </div>

            {/* 3. THE INFO CARD */}
            <div className="w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2">
              
              {/* Color Accent Bar (Hidden until hover) */}
              <div className={`absolute top-0 left-0 w-1 h-full ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Subtle background tint on hover */}
              <div className={`absolute inset-0 ${step.lightColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`} />

              <h3 className={`text-lg font-bold text-slate-900 mb-2 group-hover:${step.textColor} transition-colors`}>
                {step.title}
              </h3>
              
              <p className="text-sm text-slate-500 font-medium leading-relaxed relative z-10">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}