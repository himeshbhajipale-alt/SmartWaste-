"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { motion } from "framer-motion";
import { BookOpen, Video, FileText, CheckCircle2, Leaf, Recycle, Trash2 } from "lucide-react";

export default function AwarenessCenter() {
  const categories = [
    { title: "Segregation Basics", icon: Recycle, color: "text-emerald-500", items: 12 },
    { title: "Eco-Living Hacks", icon: Leaf, color: "text-green-500", items: 8 },
    { title: "Composting 101", icon: Trash2, color: "text-amber-500", items: 5 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-4">Eco-Intelligence Center</h1>
          <p className="text-foreground/60 text-lg max-w-2xl">Master the art of sustainable living with our curated guides and resources.</p>
        </header>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-[2.5rem] bg-white border border-secondary shadow-sm"
            >
              <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center mb-6">
                <cat.icon className={`h-8 w-8 ${cat.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-1">{cat.title}</h3>
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{cat.items} Resources</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
            <Video className="text-primary" />
            Featured Tutorials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Mastering Plastic Segregation", duration: "5:30", tags: ["Beginner", "Segregation"] },
              { title: "Building Your Home Compost", duration: "12:15", tags: ["Advanced", "Organic"] },
            ].map((video, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-secondary/30 rounded-[2rem] mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{video.title}</h3>
                <div className="flex gap-2 mt-2">
                  {video.tags.map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="p-8 bg-primary rounded-[2.5rem] text-white">
          <h2 className="text-2xl font-bold mb-6">Pro Eco-Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Check for the recycling symbol number on plastics.",
              "Rinse food containers to avoid batch contamination.",
              "Compost fruit peels, coffee grounds, and eggshells.",
              "Never put plastic bags in city recycling bins."
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/10 rounded-2xl">
                <CheckCircle2 className="h-6 w-6 text-emerald-300 shrink-0" />
                <p className="text-sm font-medium leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
