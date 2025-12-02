// [ID: H1K3L5N] - Main Dashboard (Final Integrated Version)
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl } from "@/utils/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/SpotlightCard";
import AddSecretModal from "@/components/AddSecretModal";
import AddNomineeModal from "@/components/AddNomineeModal"; // <--- Nominee Modal
import { Plus, Lock, FileText, Image as ImageIcon, Loader2, ShieldCheck, LogOut } from "lucide-react";

// Define what a Vault Item looks like
interface VaultItem {
  id: string;
  name: string;
  mimeType: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, token, logout, isLoading } = useAuth();
  const router = useRouter();
  
  // Vault State
  const [items, setItems] = useState<VaultItem[]>([]);
  const [fetching, setFetching] = useState(true);
  
  // Nominee State
  const [nominees, setNominees] = useState<any[]>([]);
  
  // Modals State
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isNomineeModalOpen, setIsNomineeModalOpen] = useState(false);

  // [ID: J4M6P8Q] - Protect the Route
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // [ID: FETCH_ALL] - Combined Fetcher
  const refreshAll = () => {
    if (!token) return;
    
    // 1. Fetch Vault Items
    fetch(getApiUrl("/api/vault"), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
        setFetching(false);
      })
      .catch((err) => {
        console.error("Failed to load vault", err);
        setFetching(false);
      });

    // 2. Fetch Nominees
    fetch(getApiUrl("/nominee"), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setNominees(data);
      })
      .catch((err) => console.error("Failed to load nominees", err));
  };

  // Run on mount or token change
  useEffect(() => {
    refreshAll();
  }, [token]);

  if (isLoading || !user) return null; // Wait for auth check

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Dashboard Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xl">
          <div className="p-1.5 bg-teal-600 rounded text-white">
            <ShieldCheck size={20} />
          </div>
          LegacyVault
        </div>
        <div className="flex items-center gap-6">
           <span className="text-sm text-slate-500 hidden md:block">
             Signed in as <b className="text-slate-900">{user.email}</b>
           </span>
           <button 
             onClick={logout}
             className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
           >
             <LogOut size={16} /> Sign Out
           </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {/* 2. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Secure Vault</h1>
            <p className="text-slate-500 mt-1">
              {items.length} encrypted assets protected.
            </p>
          </div>
          
          <button 
            onClick={() => setIsSecretModalOpen(true)}
            className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Add New Secret
          </button>
        </div>

        {/* 3. Vault Grid */}
        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-teal-600 h-10 w-10" />
          </div>
        ) : items.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <div className="inline-flex p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
              <Lock size={48} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your vault is empty</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              Add your bank details, crypto keys, or important documents. They will be encrypted immediately.
            </p>
          </div>
        ) : (
          // Items Grid
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item) => (
              <SpotlightCard key={item.id} className="cursor-pointer group">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl ${
                    item.mimeType.includes("image") ? "bg-purple-100 text-purple-600" :
                    item.mimeType.includes("pdf") ? "bg-orange-100 text-orange-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {item.mimeType.includes("image") ? <ImageIcon size={24} /> : 
                     item.mimeType.includes("pdf") ? <FileText size={24} /> : 
                     <Lock size={24} />}
                  </div>
                  <span className="text-xs font-mono text-slate-400">AES-256</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  Added on {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </SpotlightCard>
            ))}
          </div>
        )}

        {/* 4. Nominees Section (The New Part) */}
        <div className="mt-16 mb-8 border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">My Nominees</h2>
            <button 
              onClick={() => setIsNomineeModalOpen(true)} 
              className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <Plus size={16} /> Add Nominee
            </button>
          </div>
          
          {nominees.length === 0 ? (
             <p className="text-slate-400 text-sm italic">You have not added any beneficiaries yet.</p>
          ) : (
             <div className="grid md:grid-cols-2 gap-4">
              {nominees.map(n => (
                <div key={n.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:shadow-sm transition">
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                    {n.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{n.name}</h4>
                    <p className="text-xs text-slate-500">{n.relationship} • {n.email}</p>
                  </div>
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Notified</span>
                </div>
              ))}
             </div>
          )}
        </div>
      </main>

      {/* 5. Modals */}
      <AddSecretModal 
        isOpen={isSecretModalOpen} 
        onClose={() => setIsSecretModalOpen(false)} 
        onSuccess={refreshAll} 
      />
      
      <AddNomineeModal
        isOpen={isNomineeModalOpen}
        onClose={() => setIsNomineeModalOpen(false)}
        onSuccess={refreshAll}
      />
    </div>
  );
}