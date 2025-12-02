"use client";
import { useState } from "react";
import { X, UserPlus, Save, Loader2, Mail, Phone, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl } from "@/utils/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNomineeModal({ isOpen, onClose, onSuccess }: Props) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", relationship: "" });

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(getApiUrl("/nominee"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add nominee");

      onSuccess();
      onClose();
      setFormData({ name: "", email: "", phone: "", relationship: "" }); // Reset
    } catch (err) {
      alert("Failed to add nominee");
    } finally {
      setLoading(false);
    }
  };

  // Common input styles for consistency
  const inputClasses = "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition shadow-sm text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <UserPlus size={18} className="text-teal-600" /> Add Beneficiary
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition"><X size={20} className="text-slate-400" /></button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input 
                required 
                className={inputClasses} 
                placeholder="e.g. John Doe"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email (For Notification)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input 
                required 
                type="email" 
                className={inputClasses}
                placeholder="john@example.com"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
          </div>

          {/* Grid for Phone & Relationship */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Phone</label>
                <div className="relative">
                   <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                   <input 
                     className={inputClasses} 
                     placeholder="+91..."
                     value={formData.phone} 
                     onChange={e => setFormData({...formData, phone: e.target.value})} 
                   />
                </div>
            </div>
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Relationship</label>
                <input 
                  required 
                  // No icon here, so less padding-left
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition shadow-sm text-sm"
                  placeholder="e.g. Brother"
                  value={formData.relationship} 
                  onChange={e => setFormData({...formData, relationship: e.target.value})} 
                />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-xs p-3 rounded-lg flex items-start gap-2">
            <span className="text-lg leading-none">ℹ️</span>
            <span>They will receive an email notification immediately informing them of their role.</span>
          </div>

          <button 
            disabled={loading} 
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save size={18} /> Add & Notify Nominee</>}
          </button>
        </form>
      </div>
    </div>
  );
}