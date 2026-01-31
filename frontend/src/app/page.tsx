"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-blue-100">
      {/* Animated Navigation */}
      
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center pt-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            Scale faster for <br />
            <span className="text-blue-600 italic">significantly less.</span>
          </h1>
          
          <p className="mt-8 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Exclusive SaaS deals and cloud credits for early-stage startups. 
            Stop paying full price for the tools you need to grow.
          </p>

          <div className="mt-12 flex gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform">
              Claim $50k in Credits
            </button>
            <button className="border border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
              View All 200+ Deals
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}