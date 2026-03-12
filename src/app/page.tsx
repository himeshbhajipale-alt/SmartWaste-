"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Leaf, Recycle, Award, MapPin, ArrowRight, BarChart3, ShieldCheck, Trophy } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6 inline-block">
              Eco-Friendly Revolution 🌿
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Transforming Waste into <br />
              <span className="text-primary italic">Community Wealth</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
              SmartWaste is the world's most advanced segregation & recycling tracker. 
              Earn rewards, track your impact, and build a sustainable future with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login" 
                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
              >
                Join the Mission <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/awareness" 
                className="px-8 py-4 bg-white border border-primary/20 text-primary rounded-2xl font-bold text-lg hover:bg-secondary/20 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Shapes Decor */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow -z-10" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow -z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "12,000+" },
              { label: "Waste Segregated", value: "450 Tons" },
              { label: "Plastic Recycled", value: "85k kg" },
              { label: "Community Points", value: "1.2M" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-primary mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 container px-4 mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How it Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Classification",
              desc: "Snap a photo of your waste, and our AI instantly identifies the category and disposal method.",
              icon: Recycle,
            },
            {
              title: "Track Progress",
              desc: "Monitor your ecological footprint and see how much waste you've diverted from landfills.",
              icon: BarChart3,
            },
            {
              title: "Earn Rewards",
              desc: "Get EcoPoints for every verified action. Redeem them for local community perks and badges.",
              icon: Award,
            },
            {
              title: "Smart Reporting",
              desc: "Report overflowing bins or illegal dumping in your area with GPS-tagged submissions.",
              icon: MapPin,
            },
            {
              title: "Community Leaderboard",
              desc: "Compete with neighbors and cities to see who can achieve the highest recycling rate.",
              icon: Trophy,
            },
            {
              title: "Verified Disposal",
              desc: "QR code secured tracking ensures your waste reaches the right recycling facility.",
              icon: ShieldCheck,
            },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white border border-secondary shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-12 bg-secondary/10">
        <div className="container px-4 mx-auto text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-primary mb-4">
            <Leaf className="h-6 w-6" />
            <span>SmartWaste</span>
          </div>
          <p className="text-sm text-foreground/50">
            © 2026 SmartWaste Segregation. Building a cleaner planet, one scan at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
