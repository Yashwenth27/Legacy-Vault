import Navbar from "@/components/Navbar";
import DecryptedText from "@/components/DecryptedText";
import SpotlightCard from "@/components/SpotlightCard";
import CrossGrid from "@/components/CrossGrid";
import HeroImage from "@/components/HeroImage"; // <--- NEW IMPORT
import ProblemImage from "@/components/ProblemImage"; // <--- NEW IMPORT
import { ShieldCheck, UserX, Key, ArrowRight, HeartPulse, CheckCircle2, Lock, XCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative font-sans selection:bg-teal-100">
      <Navbar />

      {/* --------------------------------------------------
          1. HERO SECTION
         -------------------------------------------------- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <CrossGrid /> 
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* TEXT SIDE */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-100 text-teal-700 text-xs font-bold mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              LIVE: 1,204 Vaults Secured
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              <DecryptedText text="Secure"></DecryptedText> your legacy <br/>
              <span className="text-teal-600">
                 before it's too late.
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              The automated <b>Dead Man's Switch</b> for India's digital generation. We ensure your crypto, passwords, and assets transfer securely to your family—if you stop responding.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
                Start Free Vault <ArrowRight size={18} />
              </Link>
              <div className="flex items-center gap-4 px-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1"><CheckCircle2 size={16} className="text-teal-600"/> No Credit Card</div>
                <div className="flex items-center gap-1"><CheckCircle2 size={16} className="text-teal-600"/> Cancel Anytime</div>
              </div>
            </div>
          </div>

          {/* VISUAL SIDE (Hero SVG) */}
          <div className="relative hidden md:block">
             <HeroImage />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          2. THE PROBLEM (Problem SVG)
         -------------------------------------------------- */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* VISUAL SIDE */}
          <div className="order-2 md:order-1 relative p-8 bg-slate-50 rounded-3xl border border-slate-100">
             <ProblemImage />
          </div>

          {/* TEXT SIDE */}
          <div className="order-1 md:order-2">
            <div className="text-red-600 font-bold tracking-wider uppercase text-sm mb-2">The Silent Crisis</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ₹1.5 Lakh Crore is lost forever.
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              When a digital breadwinner passes away, families are often locked out of bank accounts, crypto wallets, and trading portfolios because they simply <b>don't know the passwords</b>.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700">
                <XCircle size={20} className="text-red-500" /> Spouses don't know the phone PIN code.
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <XCircle size={20} className="text-red-500" /> Crypto keys are lost on hidden hard drives.
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <XCircle size={20} className="text-red-500" /> Insurance policies go unclaimed for years.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          3. FEATURES GRID
         -------------------------------------------------- */}
      <section id="features" className="py-24 px-6 bg-slate-50 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Engineered for Trust.</h2>
            <p className="mt-4 text-slate-600 text-lg">We assume we will be hacked. That’s why we built a system where even <b>we</b> cannot see your data.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SpotlightCard>
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Key size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Knowledge</h3>
              <p className="text-slate-600 leading-relaxed">
                Encryption happens <b>on your device</b>. We store only "gibberish." We literally cannot unlock your vault even if the government asks.
              </p>
            </SpotlightCard>

            <SpotlightCard>
              <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <HeartPulse size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Heartbeat Protocol</h3>
              <p className="text-slate-600 leading-relaxed">
                We ping you via Email. If you stop responding after a grace period, the system assumes the worst and triggers the release protocol.
              </p>
            </SpotlightCard>

            <SpotlightCard>
              <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Physical Recovery</h3>
              <p className="text-slate-600 leading-relaxed">
                Your beneficiary receives a <b>Physical QR Key</b>. They don't need to remember a password during a crisis. Just scan to unlock.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          4. PRICING (Indian Market Context)
         -------------------------------------------------- */}
      <section id="pricing" className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-slate-600">Protecting your life's work shouldn't cost a fortune.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FREE PLAN */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col">
              <div className="mb-4">
                <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wide">Starter</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">Free<span className="text-lg text-slate-500 font-normal"> / forever</span></h3>
              <p className="text-slate-500 mb-8">For individuals just getting organized.</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 size={18} className="text-slate-400"/> 3 Secure Items</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 size={18} className="text-slate-400"/> 1 Nominee</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 size={18} className="text-slate-400"/> Email Heartbeat</li>
                <li className="flex items-center gap-3 text-slate-400"><XCircle size={18} /> No Physical Key Kit</li>
              </ul>

              <Link href="/signup" className="w-full py-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-center hover:bg-white hover:shadow-md transition">
                Start for Free
              </Link>
            </div>

            {/* PRO PLAN (Hero) */}
            <div className="p-8 rounded-3xl border-2 border-teal-500 bg-white shadow-2xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">MOST POPULAR</div>
              <div className="mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full uppercase tracking-wide">Protector</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">₹499<span className="text-lg text-slate-500 font-normal"> / year</span></h3>
              <p className="text-slate-500 mb-8">Complete automation for your family's future.</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle2 size={18} className="text-teal-500"/> Unlimited Secure Items</li>
                <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle2 size={18} className="text-teal-500"/> Unlimited Nominees</li>
                <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle2 size={18} className="text-teal-500"/> Priority Heartbeat (WhatsApp soon)</li>
                <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle2 size={18} className="text-teal-500"/> Printable Recovery Kit</li>
              </ul>

              <Link href="/signup?plan=pro" className="w-full py-4 rounded-xl bg-teal-600 text-white font-bold text-center hover:bg-teal-700 hover:shadow-lg transition transform hover:-translate-y-1">
                Get Protected
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          5. FOOTER
         -------------------------------------------------- */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <ShieldCheck className="text-teal-500" /> LegacyVault
            </div>
            <p className="max-w-xs text-sm">
              The secure, automated digital inheritance protocol for India. 
              Built with Zero-Knowledge encryption.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400">Features</a></li>
              <li><a href="#" className="hover:text-teal-400">Security</a></li>
              <li><a href="#" className="hover:text-teal-400">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-400">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          © {new Date().getFullYear()} LegacyVault Inc. Made with ❤️ in India.
        </div>
      </footer>
    </main>
  );
}