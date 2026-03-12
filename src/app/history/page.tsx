"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth, WasteRecord } from "@/context/AuthContext";
import { format } from "date-fns";
import { Trash2, History as HistoryIcon, Search, Filter, Calendar, MapPin, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WasteHistory() {
  const { user, db } = useAuth();
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && db) {
      // Filter records for CURRENT user if it's not admin
      // In our local DB, anyone can see their own
      const myRecords = db.records.filter(r => r.userId === user.uid);
      setRecords(myRecords);
      setLoading(false);
    }
  }, [user, db]);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <Navbar />
      
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-2 px-1">
              <Database size={14} /> Local Data Ledger
            </div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              Recycling Logs
            </h1>
            <p className="text-slate-500 font-medium">Tracking your sustainable footprint across all sessions.</p>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Months" className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none w-32 shadow-sm" />
            </div>
            <button className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all shadow-sm">
              <Filter size={20} className="text-slate-500" />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Querying History</p>
          </div>
        ) : records.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-16 text-center border border-slate-200 shadow-xl shadow-slate-200/50"
          >
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-emerald-200" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">No records found</h2>
            <p className="text-slate-500 max-w-xs mx-auto mb-10 font-medium leading-relaxed">You haven't submitted any waste logs yet. Start contributing to see your impact!</p>
            <button 
              onClick={() => window.location.href = '/submit'}
              className="px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-emerald-700 hover:shadow-xl transition-all shadow-lg"
            >
              Log First Entry 🌿
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {records.map((record, index) => (
                <motion.div 
                  key={record.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex flex-wrap items-center justify-between gap-4 group hover:shadow-2xl hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Decorative background pulse for verified items */}
                  {record.status === 'verified' && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-full my-6 opacity-40" />
                  )}

                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner ${
                      record.wasteType === 'organic' ? 'bg-emerald-50 text-emerald-600' :
                      record.wasteType === 'plastic' ? 'bg-blue-50 text-blue-600' :
                      record.wasteType === 'paper' ? 'bg-orange-50 text-orange-600' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      <Trash2 size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight">{record.wasteType}</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
                        {format(new Date(record.timestamp), "MMM dd, yyyy • hh:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10 ml-auto mr-12">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                      <p className="text-2xl font-black text-slate-900">{record.quantity} <span className="text-sm opacity-30">kg</span></p>
                    </div>
                    <div className="text-right border-l pl-10 border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Points</p>
                      <p className="text-2xl font-black text-emerald-600">+{Math.ceil(record.quantity * 12)}</p>
                    </div>
                  </div>

                  <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    record.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {record.status}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="mt-12 text-center py-8">
               <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">End of Ledger</p>
               <div className="w-1 h-8 bg-slate-200 mx-auto mt-4 rounded-full" />
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
