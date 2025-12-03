"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Printer, Key, Crown, Lock , Loader2} from "lucide-react";
import * as QRCodeModule from 'qrcode.react';

// We will use the user's ID as the "key" hint for the QR code
// In a real system, you would store a unique recovery seed.

export default function RecoveryPage() {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const QRCode = (QRCodeModule as any).default || QRCodeModule;

  // [ID: CHECK_AUTH] - Protect the route
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.plan !== 'DIAMOND') {
        alert("Access Denied: This feature requires the Diamond Plan.");
        router.push("/dashboard");
      }
      setLoading(false);
    }
  }, [user, isLoading, router]);

  if (loading || !user || user.plan !== 'DIAMOND') {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-10 w-10 animate-spin text-teal-600" /></div>;
  }

  // Generate the Recovery Data: This is the critical information
  // We use the User ID as the identifier, but encode the *Lock Key Hint* here.
  const recoveryKeyData = `LV_ID:${user.id}|EMAIL:${user.email}`;

  const handlePrint = () => {
    // Triggers the browser's print dialogue for the entire window/page
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
        <header className="max-w-4xl mx-auto mb-8 text-center print:hidden">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
                <Crown className="text-amber-500 fill-amber-500 h-8 w-8" />
                Physical Recovery Kit
            </h1>
            <p className="text-slate-500">Print this page and store it securely offline. This card is the **ONLY** way your beneficiary can unlock your vault.</p>
        </header>

        {/* --- PRINTABLE CARD CONTAINER --- */}
        <div ref={cardRef} className="max-w-md mx-auto p-8 border-4 border-dashed border-teal-500 rounded-3xl bg-white shadow-2xl print:border-none print:shadow-none">
            
            {/* The Recovery Card Content */}
            <div className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden text-white shadow-xl">
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/10 transform skew-x-[15deg] origin-bottom-left"></div>

                <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="font-mono text-xs text-slate-400">LEGACY VAULT | PROTECTOR</span>
                    <Crown className="h-6 w-6 text-amber-400 fill-amber-400" />
                </div>

                <div className="text-lg font-bold mb-4 relative z-10">MASTER RECOVERY KEY</div>
                
                <div className="bg-white p-3 rounded-xl inline-block shadow-lg mb-6 relative z-10">
                    {/* QR Code Embed - Uses unique user data */}
                    <QRCode value={recoveryKeyData} size={100} level="H" includeMargin={true} fgColor="#0f172a" />
                </div>

                <div className="flex justify-between items-end text-sm relative z-10">
                    <div>
                        <p className="text-slate-400 text-xs uppercase">Vault Owner</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs uppercase text-right">Owner ID Hint</p>
                        <p className="font-semibold font-mono text-right">{user.id.substring(0, 12)}</p>
                    </div>
                </div>
            </div>

            {/* Crucial Instructions */}
            <div className="mt-4 p-4 text-sm bg-red-50 text-red-800 rounded-lg print:hidden">
                <p className="font-bold flex items-center gap-2"><Lock size={16} /> SECURITY WARNING</p>
                <p className="mt-1">
                    This QR code contains the necessary information to recover your data. Treat this printout as seriously as a physical vault key. Do **NOT** store this digital file on cloud services (Google Drive/Dropbox).
                </p>
            </div>
        </div>
        
        {/* Print Button */}
        <div className="mt-8 text-center print:hidden">
            <button 
                onClick={handlePrint} 
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-0.5"
            >
                <Printer size={20} /> Print Recovery Card
            </button>
        </div>

    </div>
  );
}