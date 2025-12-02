import Navbar from "@/components/Navbar";
import DecryptedText from "@/components/DecryptedText";
import SpotlightCard from "@/components/SpotlightCard";
import CrossGrid from "@/components/CrossGrid";
import { ShieldCheck, UserX, Key, ArrowRight, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* --------------------------------------------------
          1. HERO SECTION (Text Left, Visual Right)
         -------------------------------------------------- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        
        {/* NEW: Background Animations */}
        <CrossGrid /> 
        
        {/* Soft Gradient Blob for depth */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT: Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              Trusted by 100+ Beta Users
            </div>
            
            {/* NEW POSITIVE HEADLINE */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Secure your digital legacy <br/>
              <span className="text-teal-600">
                 for those who <DecryptedText text="matter most." className="text-teal-600" />
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              The automated safety net for your digital assets. We ensure your passwords, crypto, and memories are <b>securely transferred</b> to your family—exactly when they need them.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
                Start My Vault <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-4 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition border border-slate-200">
                How it works
              </button>
            </div>
          </div>

          {/* RIGHT: Visual (Vault Interface) */}
          <div className="relative">
            <div className="w-full aspect-square bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden p-8">
               {/* Decorative "Safe" UI */}
               <div className="absolute inset-x-0 top-0 h-32 bg-slate-50 border-b border-slate-100/50"></div>
               <div className="relative z-10 w-full max-w-xs bg-white border border-slate-200 shadow-xl rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-slate-200 rounded mb-1"></div>
                      <div className="h-2 w-16 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 rounded"></div>
                    <div className="h-2 w-full bg-slate-100 rounded"></div>
                    <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="mt-6 h-10 w-full bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-bold tracking-widest">
                    VAULT SECURED
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          2. THE PROBLEM (Image Left, Text Right)
         -------------------------------------------------- */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Vector Illustration */}
          <div className="order-2 md:order-1 relative">
             <div className="w-full aspect-[4/3] bg-teal-50 rounded-3xl flex items-center justify-center">
                <UserX size={120} className="text-teal-200" />
                {/* Replace with <img src="/lost_files.svg" /> */}
             </div>
          </div>

          {/* RIGHT: Text */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              The <span className="text-red-500">₹1.5 Lakh Crore</span> Problem.
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Every day, thousands of crypto wallets, bank accounts, and trading portfolios become permanently inaccessible because the owner passed away without sharing the password.
            </p>
            <ul className="space-y-4">
              {[
                "Spouses don't know the iPhone passcode.",
                "Crypto keys are lost on hidden hard drives.",
                "Insurance policies go unclaimed for years."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✕</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          3. FEATURES GRID (Cards)
         -------------------------------------------------- */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Built for Paranoia.</h2>
            <p className="mt-4 text-slate-600">We assume we will be hacked. That’s why we built a system where even <b>we</b> cannot see your data.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SpotlightCard>
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Key size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Knowledge</h3>
              <p className="text-slate-600 leading-relaxed">
                Encryption happens on your device. We store only "gibberish." We literally cannot unlock your vault even if the government asks.
              </p>
            </SpotlightCard>

            <SpotlightCard>
              <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <HeartPulse size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Heartbeat Check</h3>
              <p className="text-slate-600 leading-relaxed">
                We ping you via WhatsApp & Email. If you are alive, just click "Yes." If you stop responding, the timer begins.
              </p>
            </SpotlightCard>

            <SpotlightCard>
              <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Physical Key</h3>
              <p className="text-slate-600 leading-relaxed">
                Your beneficiary gets a physical QR card. They don't need to remember a password during a crisis. Just scan to unlock.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

    </main>
  );
}