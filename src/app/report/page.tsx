"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Camera, Send, CheckCircle2, X } from "lucide-react";
import { useAuth, CitizenReport } from "@/context/AuthContext";

export default function ReportIssue() {
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { user } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 2000));

    const newReportId = "rep_" + Math.random().toString(36).substr(2, 9);
    const newReport: CitizenReport = {
      id: newReportId,
      userId: user.uid,
      issueType,
      location,
      description,
      status: "open",
      timestamp: new Date().toISOString()
    };

    // Save to Local DB
    const currentReports = JSON.parse(localStorage.getItem("sw_reports") || "[]");
    localStorage.setItem("sw_reports", JSON.stringify([newReport, ...currentReports]));

    setIsSuccess(true);
    setTimeout(() => (window.location.href = '/dashboard'), 3500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col justify-center items-center p-8 text-center text-white">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-4xl font-black mb-4">Report Lodged!</h2>
          <p className="text-emerald-200/60 font-medium max-w-xs mx-auto leading-relaxed">
            Your report is now in the municipal ledger. Citizens in your community have been notified.
          </p>
          <div className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Redirecting to Dashboard...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <Navbar />
      <main className="container max-w-2xl mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-500/10 border border-red-50">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Citizen Reporting</h1>
          <p className="text-slate-500 font-medium mt-2">Report bin overflow or illegal dumping for immediate action.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/40">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Issue Category</label>
            <div className="grid grid-cols-2 gap-3">
              {["overflow", "dumping", "missing", "damage"].map(t => (
                <button 
                  key={t}
                  type="button"
                  onClick={() => setIssueType(t)}
                  className={`p-4 rounded-2xl border-2 font-bold text-sm capitalize transition-all ${
                    issueType === t ? 'border-primary bg-emerald-50 text-emerald-800 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {t} Bin/Area
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Precise Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="Street name or landmark..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-800 placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Description of problem</label>
            <textarea 
              required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what you see..."
              className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-800 placeholder:text-slate-300 resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Photographic Evidence</label>
            {!previewImage ? (
              <div 
                onClick={() => document.getElementById('file_up')?.click()}
                className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-4">
                  <Camera className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Snap Problem</p>
                <input type="file" id="file_up" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            ) : (
              <div className="relative rounded-[2.5rem] overflow-hidden group aspect-video bg-black w-full border-4 border-white shadow-2xl">
                <img src={previewImage} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={isSubmitting || !issueType}
            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-slate-900/40 hover:-translate-y-1 transition-all disabled:opacity-30 disabled:translate-y-0"
          >
            {isSubmitting ? "TRANSMITTING DATA..." : (
              <>
                SEND REPORT <Send size={20} />
              </>
            )}
          </button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
