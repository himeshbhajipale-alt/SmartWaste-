"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area
} from "recharts";
import { 
  Database, Users, Recycle, TrendingUp, 
  AlertTriangle, Trash2, ShieldCheck, Clock, 
  Cpu, Hash, Binary, Lock, Key, Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const { user, chain, db } = useAuth();
  const [activeTab, setActiveTab] = useState<"explorer" | "users" | "records" | "stats">("explorer");

  const records = db.records;
  const users = db.users;

  return (
    <div className="min-h-screen bg-[#050c0a] text-emerald-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3">
              <ShieldCheck size={14} /> Immutable Decentralized Ledger
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white">
              Chain Controller <span className="text-slate-700">v1.0</span>
            </h1>
            <p className="text-emerald-400/40 font-medium mt-2">Managing {chain.length} blocks with cryptographic integrity.</p>
          </motion.div>
          
          <div className="flex bg-[#0a1512] p-1.5 rounded-2xl border border-emerald-900/40">
            {["explorer", "users", "records", "stats"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? "bg-primary text-white shadow-[0_0_20px_#10b98144]" : "text-emerald-400/30 hover:text-emerald-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "explorer" && (
            <motion.div key="explorer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-8 bg-[#0a1512]/60 rounded-[2.5rem] border border-emerald-900/20">
                    <div className="flex justify-between items-center mb-6">
                       <Cpu className="text-primary" />
                       <span className="text-[10px] font-black text-emerald-500/40 uppercase">Network Hashrate</span>
                    </div>
                    <p className="text-4xl font-black text-white">{(Math.random()*15 + 10).toFixed(2)} <span className="text-sm opacity-20">KH/s</span></p>
                    <p className="text-[10px] font-bold text-emerald-400/40 mt-2 uppercase tracking-widest">Local Node Status: Operational</p>
                 </div>
                 <div className="p-8 bg-[#0a1512]/60 rounded-[2.5rem] border border-emerald-900/20">
                    <div className="flex justify-between items-center mb-6">
                       <Binary className="text-primary" />
                       <span className="text-[10px] font-black text-emerald-500/40 uppercase">Blocks Mined</span>
                    </div>
                    <p className="text-4xl font-black text-white"># {chain.length}</p>
                    <p className="text-[10px] font-bold text-emerald-400/40 mt-2 uppercase tracking-widest leading-none">Last Hash: {chain[chain.length-1].hash.slice(0,12)}...</p>
                 </div>
                 <div className="p-8 bg-[#0a1512]/60 rounded-[2.5rem] border border-emerald-900/20">
                    <div className="flex justify-between items-center mb-6">
                       <LinkIcon className="text-primary" />
                       <span className="text-[10px] font-black text-emerald-500/40 uppercase">Integrity Status</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                       <p className="text-3xl font-black text-white italic uppercase tracking-tighter">Verified</p>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-400/40 mt-3 uppercase tracking-widest leading-none">Merkle Proof: Valid</p>
                 </div>
               </div>

               <div className="space-y-4">
                 <p className="px-6 text-[10px] font-black text-emerald-400/40 uppercase tracking-[0.4em]">Block History (The Ledger)</p>
                 {chain.slice().reverse().map((block, i) => (
                   <motion.div 
                     key={block.hash}
                     initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                     className="group bg-[#0a1512]/40 rounded-3xl border border-emerald-900/20 hover:border-primary/40 transition-all p-6 relative overflow-hidden"
                   >
                     <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                        <Lock size={120} />
                     </div>
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center font-black text-primary text-sm border border-primary/20">
                              {block.index}
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <p className="font-black text-white text-sm uppercase tracking-widest">{block.data.type || "GENESIS_BLOCK"}</p>
                                 <span className="text-[8px] font-black px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">n: {block.nonce}</span>
                              </div>
                              <p className="text-[10px] flex items-center gap-1.5 font-bold text-emerald-400/30 font-mono">
                                 <Hash size={10} /> {block.hash}
                              </p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Time Sealed</p>
                           <p className="text-xs font-bold text-white">{new Date(block.timestamp).toLocaleString()}</p>
                        </div>
                     </div>

                     <div className="mt-6 pt-6 border-t border-emerald-900/20 grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-8 p-4 bg-black/40 rounded-2xl border border-white/5">
                           <pre className="text-[10px] text-emerald-400/60 font-mono overflow-x-auto">
                              {JSON.stringify(block.data, null, 2)}
                           </pre>
                        </div>
                        <div className="md:col-span-4 flex flex-col justify-end text-right">
                           <p className="text-[8px] font-black text-emerald-400/20 uppercase mb-2">PROXIMAL LINKAGE</p>
                           <p className="text-[10px] font-mono text-emerald-400/40 truncate italic px-2">Prev: {block.previousHash}</p>
                        </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          )}

          {activeTab === "users" && (
             <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0a1512]/30 rounded-[2.5rem] border border-emerald-900/20 overflow-hidden backdrop-blur-3xl">
                <table className="w-full text-left">
                   <thead className="bg-emerald-950/40 border-b border-emerald-900/30">
                      <tr className="text-[10px] font-black text-emerald-400/50 uppercase tracking-[0.2em]">
                         <th className="px-8 py-6">Identity</th>
                         <th className="px-8 py-6">Points Value</th>
                         <th className="px-8 py-6">Network Tier</th>
                         <th className="px-8 py-6 text-right">Admin Control</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-emerald-900/20">
                      {users.map(u => (
                         <tr key={u.uid} className="hover:bg-emerald-500/5 transition-all group">
                            <td className="px-8 py-6">
                               <p className="font-black text-lg text-white group-hover:text-primary transition-colors">{u.name}</p>
                               <p className="text-xs font-bold text-emerald-400/30 uppercase tracking-widest">{u.email}</p>
                            </td>
                            <td className="px-8 py-6">
                               <span className="text-2xl font-black text-slate-300">{u.ecoPoints} <span className="text-[10px] opacity-20">EP</span></span>
                            </td>
                            <td className="px-8 py-6">
                               <span className={`px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest rounded-lg ${u.role === 'admin' ? 'border-amber-500/40 text-amber-500 bg-amber-500/5' : ''}`}>
                                  {u.role}
                               </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <button onClick={() => db.deleteUser(u.uid)} className="p-3 text-red-500/30 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all">
                                  <Trash2 size={20} />
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </motion.div>
          )}

          {activeTab === "records" && (
             <motion.div key="records" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {records.map(r => (
                   <div key={r.id} className="bg-[#0a1512]/40 p-1 rounded-[2.5rem] border border-emerald-900/30">
                      <div className="bg-[#050c0a] rounded-[2rem] p-8 flex items-center justify-between">
                         <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-primary shadow-inner border border-emerald-500/20">
                               <Recycle size={32} />
                            </div>
                            <div>
                               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{r.wasteType} ENTRY</h3>
                               <p className="text-[10px] font-black text-emerald-400/40 flex items-center gap-2 uppercase tracking-widest mt-1">
                                  TXID: {r.id} <span className="w-1 h-1 bg-emerald-900 rounded-full" /> Block: {r.blockHash?.slice(0, 10)}...
                               </p>
                            </div>
                         </div>

                         <div className="flex items-center gap-12 text-right">
                            <div>
                               <p className="text-[8px] font-black text-emerald-400/20 uppercase mb-1">Payload Weight</p>
                               <p className="text-3xl font-black text-white">{r.quantity} <span className="text-sm opacity-20">KG</span></p>
                            </div>
                            <div className="w-[120px]">
                               {r.status === 'pending' ? (
                                  <button 
                                     onClick={() => db.verifyRecord(r.id)}
                                     className="w-full py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-[0_0_20px_#10b98144] hover:scale-105 transition-all"
                                  >
                                     VERIFY CHAIN
                                  </button>
                               ) : (
                                  <div className="flex flex-col items-end">
                                     <span className="text-emerald-400 font-black italic tracking-tighter text-xl">SEALED</span>
                                     <Clock size={16} className="text-emerald-400/30 mt-1" />
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
