"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Award, Recycle, Trash2, TrendingUp, History, Users, ArrowUpRight, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, db, loading } = useAuth();
  const [userRecords, setUserRecords] = useState<any[]>([]);

  useEffect(() => {
    if (user && db) {
      const records = db.records.filter(r => r.userId === user.uid);
      setUserRecords(records.slice(0, 3));
    }
  }, [user, db]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }

  const totalWeight = userRecords.reduce((acc, curr) => acc + curr.quantity, 0);

  const stats = [
    { label: "Eco Points", value: user.ecoPoints.toLocaleString(), icon: Award, color: "text-amber-500", bg: "bg-amber-100/50" },
    { label: "Weight Recycled", value: `${totalWeight.toFixed(1)} kg`, icon: Trash2, color: "text-blue-500", bg: "bg-blue-100/50" },
    { label: "Recycling Rate", value: "85%", icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-100/50" },
    { label: "Community Rank", value: "#14", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-100/50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Header */}
        <header className="mb-12 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Hello, {user.name}! 👋</h1>
            <p className="text-slate-500 font-medium tracking-tight">Your impact is building a greener valley.</p>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-50">
               <Database size={18} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase text-slate-400">Local Ledger Active</p>
               <p className="text-xs font-bold text-slate-700">All data stored locally</p>
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-emerald-500/30 transition-all group"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Quick Actions */}
            <motion.section 
              whileHover={{ scale: 1.01 }}
              className="bg-emerald-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/40 border border-emerald-900"
            >
              <div className="relative z-10 max-w-sm">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 opacity-80">
                  <ShieldCheck size={14} /> AI Verification Ready
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">Instant Waste Logging</h2>
                <p className="text-emerald-300/60 mb-8 font-medium leading-relaxed">Let our vision model identify your waste types and manage your local community ledger.</p>
                <Link 
                  href="/submit" 
                  className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white rounded-[1.5rem] font-black text-lg hover:bg-emerald-400 shadow-2xl shadow-emerald-400/20 hover:shadow-emerald-400/40 transition-all uppercase tracking-widest"
                >
                  START SCANNING <ArrowUpRight size={20} />
                </Link>
              </div>
              
              {/* Decorative Holographic Circle */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
              <Recycle className="absolute top-10 -right-10 h-64 w-64 opacity-10 rotate-12" />
            </motion.section>

            {/* Recent History */}
            <section>
              <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                  <History className="h-6 w-6 text-emerald-600" />
                  Activity Stream
                </h2>
                <Link href="/history" className="text-sm text-emerald-600 font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                  Full Ledger <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="grid gap-4">
                {userRecords.length > 0 ? (
                  userRecords.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:border-emerald-200 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 text-emerald-600 rounded-3xl flex items-center justify-center border border-slate-100">
                          <Trash2 className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 uppercase text-lg tracking-tight">{item.wasteType} Submission</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} • {item.quantity}kg
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-emerald-600">+{Math.ceil(item.quantity * 12)}</p>
                        <p className="text-[10px] font-black text-slate-300 uppercase underline">pts earned</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-white">
                     <p className="text-slate-400 font-bold uppercase tracking-widest">No Recent Logs Found</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            {/* Badges */}
            <section className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-2xl shadow-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Award className="h-6 w-6 text-emerald-600" />
                Community Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                {user.badges.map((badge, i) => (
                  <div key={i} className="px-5 py-2.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-2xl uppercase border border-emerald-100 tracking-widest shadow-sm">
                    {badge}
                  </div>
                ))}
              </div>
            </section>

            {/* Community Goal */}
            <section className="p-10 rounded-[3rem] bg-slate-900 text-white overflow-hidden relative shadow-2xl shadow-slate-900/60 border border-slate-800">
              <h3 className="text-2xl font-black mb-3 text-emerald-400 tracking-tight">Green Valley Goal</h3>
              <p className="text-slate-400 text-sm mb-10 font-medium leading-relaxed">Contribute to our collective target of 1,500kg of recycled waste this week.</p>
              
              <div className="relative mb-10">
                 <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_20px_#10b981]" 
                    />
                 </div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mt-5 text-slate-500">
                   <span>1,250 kg LOGGED</span>
                   <span className="text-emerald-400">78% Target Achieved</span>
                 </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/5">
                 <Users className="text-emerald-400" size={24} />
                 <div>
                   <p className="text-xs font-black">2,480 Citizens 참여</p>
                   <p className="text-[10px] text-slate-500 font-bold">Active Contributors</p>
                 </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
