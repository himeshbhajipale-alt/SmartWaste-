"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, Trophy, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dash", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Submit", icon: PlusCircle, path: "/submit" },
    { name: "Leader", icon: Trophy, path: "/leaderboard" },
    { name: "Learn", icon: BookOpen, path: "/awareness" },
    { name: "Report", icon: AlertCircle, path: "/report" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                isActive ? "text-primary bg-secondary/50" : "text-foreground/60"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "animate-pulse-slow")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
