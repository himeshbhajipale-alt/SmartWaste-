"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Leaf, User, LogOut, LayoutDashboard, Settings, ShieldCheck } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl">
          <Leaf className="h-6 w-6" />
          <span className="hidden sm:inline">SmartWaste</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm font-black uppercase tracking-widest">
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                <Link href="/submit" className="hover:text-primary transition-colors">Submit Waste</Link>
                <Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link>
                <Link href="/admin" className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all">
                  <ShieldCheck size={14} /> Admin Panel
                </Link>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold border border-white/10">
                  {user.name?.[0] || 'U'}
                </div>
                <button 
                  onClick={() => logout()}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
