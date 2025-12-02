"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // New Router
import { ShieldCheck, Loader2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getApiUrl } from "@/utils/api";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(getApiUrl("/api/users/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      // Redirect to Login on success
      router.push("/login?registered=true"); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-3xl opacity-60"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl my-20">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-teal-50 text-teal-600 rounded-xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Your Vault</h1>
          <p className="text-slate-500 text-sm mt-2">Start your digital legacy today.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone (For WhatsApp)</label>
            <input
              type="tel"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Master Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Trust Badges */}
          <div className="py-2 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <CheckCircle size={14} className="text-teal-500" /> Free Forever Plan
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <CheckCircle size={14} className="text-teal-500" /> AES-256 Client Encryption
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have a vault?{" "}
          <Link href="/login" className="text-teal-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}