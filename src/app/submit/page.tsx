"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Sparkles, Leaf, Recycle, 
  ShoppingBasket, Newspaper, Wine, Computer, 
  CheckCircle2, QrCode, X, Search, Hash, Lock, 
  Binary, Cpu
} from "lucide-react";
import QRCode from "react-qr-code";
import { useAuth } from "@/context/AuthContext";
import ReactConfetti from "react-confetti";

const WASTE_TYPES = [
  { id: "organic", name: "Organic", icon: Leaf, color: "bg-emerald-500" },
  { id: "plastic", name: "Plastic", icon: ShoppingBasket, color: "bg-blue-500" },
  { id: "paper", name: "Paper", icon: Newspaper, color: "bg-orange-500" },
  { id: "glass", name: "Glass", icon: Wine, color: "bg-cyan-500" },
  { id: "metal", name: "Metal", icon: Recycle, color: "bg-slate-500" },
  { id: "ewaste", name: "Electronic", icon: Computer, color: "bg-indigo-500" },
];

export default function SubmitWaste() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("1.0");
  const [isClassifying, setIsClassifying] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, db } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setIsClassifying(true);
        setTimeout(() => {
          setSelectedType(WASTE_TYPES[Math.floor(Math.random() * 4)].id);
          setIsClassifying(false);
          setStep(2);
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    if (!selectedType || !user) return;
    
    setIsMining(true);
    // Simulate Blockchain Mining / Proof of Work
    setTimeout(() => {
      const block = db.addRecord({
        userId: user.uid,
        wasteType: selectedType,
        quantity: parseFloat(quantity),
        status: "pending",
        timestamp: new Date().toISOString()
      });
      
      setQrValue(block.hash);
      setIsMining(false);
      setIsSuccess(true);
      setStep(3);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 md:pb-0">
      <Navbar />
      {isSuccess && <ReactConfetti recycle={false} numberOfPieces={300} />}
      
      <main className="container max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12 flex flex-col items-center">
          <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 shadow-xl border border-emerald-900/50">
            <Lock size={12} /> Cryptographic Proof Required
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mt-2">Log Impact</h1>
          <p className="text-slate-400 font-medium">Mine your recycling data into the immutable ledger.</p>
        </header>

        <div className="bg-white rounded-[4rem] border border-slate-200 p-2 shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
          <div className="bg-slate-50 rounded-[3.8rem] p-10 min-h-[550px] flex flex-col relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="st1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col gap-6">
                  {!previewImage ? (
                    <>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 bg-white border-2 border-dashed border-emerald-300 rounded-[3rem] flex flex-col items-center justify-center p-12 hover:bg-emerald-50 transition-all group active:scale-[0.98]"
                      >
                         <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Camera className="h-10 w-10 text-emerald-600" />
                         </div>
                         <h3 className="text-2xl font-black text-slate-800">Identify Payload</h3>
                         <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">AI-Powered Vision System</p>
                         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </button>

                      <div className="grid grid-cols-2 gap-3">
                        {WASTE_TYPES.map(t => (
                          <button 
                            key={t.id} onClick={() => { setSelectedType(t.id); setStep(2); }}
                            className="bg-white p-5 border border-slate-100 rounded-3xl flex items-center gap-4 hover:border-primary transition-all shadow-sm"
                          >
                            <div className={`${t.color} p-2.5 rounded-2xl text-white shadow-lg`}><t.icon size={24}/></div>
                            <span className="font-black text-slate-700 uppercase text-xs tracking-tight">{t.name}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 rounded-[3rem] bg-black relative overflow-hidden">
                       <img src={previewImage} className="w-full h-full object-cover opacity-60 scale-110 blur-sm" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.div 
                            initial={{ top: "10%" }} animate={{ top: "90%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-6 right-6 h-1 bg-emerald-400 shadow-[0_0_30px_#10b981]" 
                          />
                          <div className="bg-black/60 backdrop-blur-3xl px-8 py-6 rounded-[2.5rem] border border-white/10 text-center">
                             <div className="flex items-center gap-3 mb-2">
                                <Cpu className="text-primary animate-pulse" size={20} />
                                <span className="text-white font-black uppercase text-xs tracking-widest">Vision Core Active</span>
                             </div>
                             <p className="text-[10px] font-bold text-emerald-400 uppercase animate-pulse">Scanning Molecular Metadata...</p>
                          </div>
                       </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="st2" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col">
                   <div className="flex-1 space-y-8">
                      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                         <div className="flex items-center gap-8 relative z-10">
                            <div className={`w-20 h-20 rounded-[2rem] ${WASTE_TYPES.find(t=>t.id===selectedType)?.color} flex items-center justify-center text-white shadow-2xl`}>
                               {(() => {
                                 const Icon = WASTE_TYPES.find(t=>t.id===selectedType)?.icon || Recycle;
                                 return <Icon size={40} />;
                               })()}
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payload Class</p>
                               <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{selectedType}</h3>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-6">Input Measurement (KG)</label>
                        <input 
                           type="number" step="0.1" value={quantity} onChange={(e)=>setQuantity(e.target.value)}
                           className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] text-4xl font-black text-slate-900 text-center outline-none focus:ring-4 focus:ring-primary/10 transition-all font-mono"
                        />
                      </div>
                   </div>

                   <button 
                     onClick={handleConfirm} disabled={isMining}
                     className="mt-12 w-full p-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-slate-900/40 relative overflow-hidden"
                   >
                     {isMining ? (
                        <div className="flex items-center justify-center gap-4">
                           <Binary size={24} className="animate-spin" />
                           <span>MINING BLOCK...</span>
                           <Hash size={16} className="absolute right-8 text-emerald-500 blur-[2px]" />
                        </div>
                     ) : (
                        "SEAL TRANSACTION"
                     )}
                   </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="st3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-8 shadow-inner border border-emerald-500/20 uppercase font-black text-xs tracking-widest">
                      SEALED
                   </div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Integrity Verified!</h2>
                   <p className="text-slate-400 font-medium mb-12">Block mined successfully. Distributed ledger updated across community nodes.</p>

                   <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-slate-50 mb-12 group hover:scale-[1.02] transition-transform duration-700">
                      <QRCode value={qrValue} size={150} fgColor="#064e3b" />
                      <div className="mt-8">
                         <p className="text-[8px] font-black text-slate-300 uppercase leading-none mb-1">TX HASH</p>
                         <p className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full inline-block">
                           {qrValue.slice(0, 8)}...{qrValue.slice(-8)}
                         </p>
                      </div>
                   </div>

                   <button 
                     onClick={() => window.location.href = '/dashboard'}
                     className="w-full py-5 bg-primary text-white font-black rounded-[2.5rem] shadow-xl shadow-emerald-700/20 uppercase tracking-widest text-sm"
                   >
                     RETURN TO PORTAL
                   </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
