"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    // Adjusted px padding for better look on small screens
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      
      {/* Logo Area - Reduced text size slightly on mobile */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-teal-600 rounded-lg text-white group-hover:bg-teal-700 transition shadow-lg shadow-teal-900/20">
          <ShieldCheck size={20} className="md:w-6 md:h-6" /> 
        </div>
        <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">LegacyVault</span>
      </Link>

      {/* Navigation Links - Hidden completely on mobile to save space */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link href="#features" className="hover:text-teal-600 transition">Features</Link>
        <Link href="#security" className="hover:text-teal-600 transition">Security</Link>
        <Link href="#pricing" className="hover:text-teal-600 transition">Pricing</Link>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Login link is only visible on large screens */}
        <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-slate-900">
          Log in
        </Link>
        <Link
          href="/signup"
          // Slightly smaller padding on mobile for button
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
        >
          Get Protected
        </Link>
      </div>
    </nav>
  );
}