"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl } from "@/utils/api";
import { Loader2, Crown } from "lucide-react";

export default function UpgradeButton() {
  const { token, user, login } = useAuth(); // <--- Get 'login' to update state
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Simulate Delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Mock Payment Data
      const fakePaymentData = {
        razorpay_order_id: `order_mock_${Date.now()}`,
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_signature: "mock_signature_bypass"
      };

      // 3. Call Backend to Upgrade
      const verifyRes = await fetch(getApiUrl("/api/payment/verify"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fakePaymentData),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        
        // --- THE CRITICAL FIX ---
        // 4. Fetch the NEW Profile immediately
        const profileRes = await fetch(getApiUrl("/api/users/me"), {
          headers: { Authorization: `Bearer ${token}` }
        });
        const profileData = await profileRes.json();

        // 5. Force update the Auth Context with new Diamond status
        if (profileData.user) {
           // We reuse the 'login' function to save the new user object
           login(token!, profileData.user);
        }

        alert("🎉 Upgrade Complete! You are now a Diamond Member.");
        // No need to reload page; 'login' updates the state instantly
        
      } else {
        alert("Payment Failed: " + (verifyData.error || "Unknown error"));
      }

    } catch (error) {
      console.error(error);
      alert("Network error during payment simulation.");
    } finally {
      setLoading(false);
    }
  };

  // If already upgraded
  if (user?.plan === "DIAMOND") {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-bold border border-amber-200 shadow-sm animate-in fade-in zoom-in">
        <Crown size={14} className="fill-amber-700" /> DIAMOND MEMBER
      </div>
    );
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Upgrade to Pro"}
    </button>
  );
}