// [ID: N0M1N33] - Nominee Access Portal (Final Fix)
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getApiUrl } from "@/utils/api";
import { decryptData } from "@/utils/encryption";
import { ShieldAlert, Lock, Unlock, Loader2, FileText, Download, KeyRound, Ghost } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";

export default function NomineeAccessPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Data
  const [ownerEmail, setOwnerEmail] = useState("");
  const [encryptedVault, setEncryptedVault] = useState<any[]>([]);
  
  // State
  const [masterKey, setMasterKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [decryptedItems, setDecryptedItems] = useState<any[]>([]);
  const [decrypting, setDecrypting] = useState(false);
  const [unlockError, setUnlockError] = useState("");

  useEffect(() => {
    fetch(getApiUrl(`/nominee/access/${id}`))
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Access Denied");
        return data;
      })
      .then((data) => {
        setOwnerEmail(data.owner);
        // SAFETY CHECK: Ensure vault is always an array
        setEncryptedVault(Array.isArray(data.vault) ? data.vault : []); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load Error:", err); // Log error to console
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setDecrypting(true);
    setUnlockError("");

    try {
      // HANDLE EMPTY VAULT CASE
      if (encryptedVault.length === 0) {
         setIsUnlocked(true);
         setDecryptedItems([]);
         setDecrypting(false);
         return;
      }

      const unlockedItems = await Promise.all(
        encryptedVault.map(async (item) => {
          try {
            const content = await decryptData(item.encryptedBlob, item.iv, masterKey);
            return { ...item, content, status: "success" };
          } catch (e) {
            return { ...item, content: null, status: "failed" };
          }
        })
      );

      const successCount = unlockedItems.filter((i) => i.status === "success").length;
      
      if (successCount === 0) {
        throw new Error("Invalid Master Key. Please check the card.");
      }

      setDecryptedItems(unlockedItems);
      setIsUnlocked(true);
    } catch (err: any) {
      setUnlockError(err.message);
    } finally {
      setDecrypting(false);
    }
  };

  const downloadFile = (base64Data: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = base64Data;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
       <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500 text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-bold mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            Identity Verified
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
             <DecryptedText text="Digital Inheritance Portal" />
          </h1>
          <p className="text-slate-500">
            Beneficiary Access for: <b className="text-slate-900">{ownerEmail}</b>
          </p>
        </div>

        {!isUnlocked ? (
          // LOCKED STATE
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-teal-500/10 opacity-50"></div>
               <div className="relative z-10">
                  <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Lock className="h-7 w-7 text-teal-400" />
                  </div>
                  <h2 className="text-xl font-bold">Decryption Required</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {encryptedVault.length > 0 
                      ? "Enter the Physical Key found on the legacy card." 
                      : "Vault appears empty, but key is required to confirm."}
                  </p>
               </div>
            </div>

            <form onSubmit={handleUnlock} className="p-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Master Key / PIN</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="password"
                  required={encryptedVault.length > 0} // Only require key if items exist
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 mb-2 font-mono text-center tracking-[0.5em] text-lg transition shadow-sm"
                  placeholder="••••"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                />
              </div>

              {unlockError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm animate-pulse">
                   <ShieldAlert size={16} />
                   {unlockError}
                </div>
              )}

              <button 
                type="submit"
                disabled={decrypting}
                className="w-full py-4 mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {decrypting ? <><Loader2 className="animate-spin" /> Verifying...</> : <><Unlock size={18} /> Unlock Vault</>}
              </button>
            </form>
          </div>
        ) : (
          // UNLOCKED STATE
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {decryptedItems.length === 0 ? (
               // EMPTY STATE MESSAGE (This fixes the blank screen)
               <div className="max-w-lg mx-auto text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
                  <div className="inline-flex p-4 bg-slate-100 rounded-full text-slate-400 mb-4">
                    <Ghost size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">This Vault is Empty</h3>
                  <p className="text-slate-500 mt-2 px-6">
                    The user {ownerEmail} did not add any secrets to their vault before their legacy protocol was triggered.
                  </p>
               </div>
            ) : (
               <div className="grid gap-6">
                {decryptedItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col md:flex-row md:items-start gap-6 hover:shadow-lg transition">
                    <div className={`shrink-0 p-4 rounded-xl ${item.status === 'success' ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-500'}`}>
                      {item.status === 'success' ? <Unlock size={24} /> : <Lock size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                        {item.status === 'failed' && <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded">WRONG KEY</span>}
                      </div>
                      {item.status === 'success' && (
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 mt-2 overflow-x-auto">
                          {item.mimeType === "text/plain" ? (
                            <div className="font-mono text-sm text-slate-800 whitespace-pre-wrap break-all">{item.content}</div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="text-slate-400" />
                                <div><p className="text-sm font-bold text-slate-700">Encrypted Document</p></div>
                              </div>
                              <button onClick={() => downloadFile(item.content, item.name)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition shadow-md">
                                <Download size={16} /> Download
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}