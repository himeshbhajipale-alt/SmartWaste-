"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { motion } from "framer-motion";
import { Trophy, Medal, MapPin, Search, Users, Crown } from "lucide-react";

const LEADERS = [
  { rank: 1, name: "Maria Garcia", points: 4850, community: "Oak Ridge", avatar: "MG" },
  { rank: 2, name: "David Chen", points: 4200, community: "Pine Valley", avatar: "DC" },
  { rank: 3, name: "Sarah Smith", points: 3950, community: "Maple Heights", avatar: "SS" },
  { rank: 4, name: "James Wilson", points: 3100, community: "Oak Ridge", avatar: "JW" },
  { rank: 5, name: "Elena Rossi", points: 2850, community: "Sunset Hills", avatar: "ER" },
  { rank: 6, name: "Kevin Park", points: 2600, community: "Riverdale", avatar: "KP" },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500"
          >
            <Trophy className="h-8 w-8 text-amber-500" />
          </motion.div>
          <h1 className="text-4xl font-black text-foreground mb-2">Community Hall of Fame</h1>
          <p className="text-foreground/60">Celebrating our top sustainability champions.</p>
        </header>

        {/* Filters/Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30" />
            <input 
              type="text" 
              placeholder="Search recyclers..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-secondary rounded-2xl outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
          <div className="flex bg-white border border-secondary p-1 rounded-2xl h-[58px]">
            <button className="px-6 rounded-xl bg-primary text-white font-bold text-sm">Global</button>
            <button className="px-6 rounded-xl text-foreground font-bold text-sm">My Community</button>
          </div>
        </div>

        {/* Podium Layout for Top 3 */}
        <div className="grid grid-cols-3 gap-4 mb-12 items-end">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full border-4 border-slate-300 mx-auto overflow-hidden flex items-center justify-center text-xl font-bold">DC</div>
              <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-black">2</div>
            </div>
            <p className="font-bold text-sm truncate">David C.</p>
            <p className="text-primary font-black text-xs">4,200</p>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="relative inline-block mb-4 scale-125">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rotate-12">
                <Crown className="h-8 w-8 text-amber-500 fill-amber-500" />
              </div>
              <div className="w-20 h-20 bg-amber-50 rounded-full border-4 border-amber-400 mx-auto overflow-hidden flex items-center justify-center text-2xl font-black">MG</div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm font-black shadow-lg">1</div>
            </div>
            <p className="font-black text-lg truncate pt-4">Maria G.</p>
            <p className="text-primary font-black">4,850</p>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <div className="w-16 h-16 bg-orange-50 rounded-full border-4 border-orange-300 mx-auto overflow-hidden flex items-center justify-center text-xl font-bold">SS</div>
              <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-black">3</div>
            </div>
            <p className="font-bold text-sm truncate">Sarah S.</p>
            <p className="text-primary font-black text-xs">3,950</p>
          </div>
        </div>

        {/* List View */}
        <div className="bg-white rounded-[2.5rem] border border-secondary divide-y overflow-hidden shadow-sm">
          {LEADERS.map((user) => (
            <motion.div 
              key={user.rank}
              whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
              className="px-6 py-5 flex items-center gap-4 transition-all"
            >
              <span className="w-6 text-center font-black text-foreground/30 text-lg">#{user.rank}</span>
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center font-bold text-primary shrink-0 text-sm">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate text-foreground">{user.name}</p>
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <MapPin size={10} className="text-foreground/40 shrink-0" />
                  <p className="text-[10px] text-foreground/40 font-medium truncate uppercase tracking-widest">{user.community}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-primary">{user.points.toLocaleString()}</p>
                <p className="text-[10px] text-foreground/40 font-bold uppercase">Points</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Stats Footer */}
        <div className="mt-8 p-6 bg-primary rounded-3xl text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black text-xl">120 Communities</p>
              <p className="text-xs opacity-70">Competing for the Green City Cup</p>
            </div>
          </div>
          <Medal className="h-10 w-10 opacity-20" />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
