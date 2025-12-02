// [ID: F8H2J1K] - Add Secret Modal (Text & File Support)
"use client";

import { useState, useRef } from "react";
import { X, Lock, Save, Loader2, KeyRound, Upload, FileText, Type } from "lucide-react";
import { encryptData } from "@/utils/encryption";
import { useAuth } from "@/context/AuthContext";
import { getApiUrl } from "@/utils/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSecretModal({ isOpen, onClose, onSuccess }: Props) {
  const { token } = useAuth();
  
  // Tabs: 'text' or 'file'
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  
  const [name, setName] = useState("");
  const [secretText, setSecretText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [masterKey, setMasterKey] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Helper: Convert File to Base64 String
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // e.g. "data:application/pdf;base64,..."
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let contentToEncrypt = "";
      let mimeType = "text/plain";

      // 1. Prepare Content
      if (activeTab === 'text') {
        if (!secretText) throw new Error("Please enter text.");
        contentToEncrypt = secretText;
      } else {
        if (!selectedFile) throw new Error("Please select a file.");
        contentToEncrypt = await readFileAsBase64(selectedFile);
        mimeType = selectedFile.type;
      }

      console.log("🔒 Encrypting...");
      const { encryptedBlob, iv } = await encryptData(contentToEncrypt, masterKey);

      // 2. Send to Backend (Using 127.0.0.1 to avoid localhost issues)
      console.log("🚀 Sending to Backend...");
      const res = await fetch(getApiUrl("/api/vault"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          encryptedBlob,
          iv,
          mimeType,
        }),
      });

      // 3. DEBUGGING: Check what the server actually sent back
      const responseText = await res.text(); 
      console.log("📥 Server Response:", responseText);

      // Try to parse it as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error("Server returned HTML (Page Not Found) instead of JSON. Check Port 4000.");
      }

      if (!res.ok) throw new Error(data.error || "Failed to save");

      onSuccess(); 
      handleClose();
      
    } catch (err: any) {
      alert("Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setSecretText("");
    setMasterKey("");
    setSelectedFile(null);
    setActiveTab("text");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Lock size={18} className="text-teal-600" />
            Add Encrypted Item
          </h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Form Content (Scrollable) */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              required
              placeholder={activeTab === 'text' ? "e.g., Bank Password" : "e.g., My Will.pdf"}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Type Selector */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'text' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Type size={16} /> Text / Note
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('file')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'file' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Upload size={16} /> File / PDF
            </button>
          </div>

          {/* Conditional Input */}
          {activeTab === 'text' ? (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Secret Content</label>
              <textarea
                rows={4}
                placeholder="Type your passwords, seeds, or notes..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-mono text-sm text-slate-900"
                value={secretText}
                onChange={(e) => setSecretText(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Upload File</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-teal-400 transition"
              >
                {selectedFile ? (
                  <div className="text-center">
                    <FileText size={32} className="text-teal-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-900">{selectedFile.name}</p>
                    <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <Upload size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click to select PDF, JPG, or PNG</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedFile(e.target.files[0]);
                      // Auto-fill title if empty
                      if (!name) setName(e.target.files[0].name);
                    }
                  }} 
                />
              </div>
            </div>
          )}

          {/* Lock Key */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="block text-xs font-bold text-amber-800 uppercase mb-1 flex items-center gap-1">
              <KeyRound size={14} /> Set a Lock Key
            </label>
            <input
              required
              type="password"
              placeholder="Enter PIN to encrypt this item"
              className="w-full px-4 py-2 bg-white border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <><Save size={18} /> Encrypt & Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}