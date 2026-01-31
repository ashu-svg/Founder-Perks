"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Award, CheckCircle, ExternalLink } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [myPerks, setMyPerks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      fetch(`http://localhost:5000/api/auth/user-perks/${parsedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMyPerks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Dashboard sync error");
          setLoading(false);
        });
    }
  }, []);

  if (!user) return <div className="p-20 text-center font-bold text-slate-500">Loading Founder Profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-500/5 border border-slate-100"
        >
          {/* Header Section */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <LayoutDashboard size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Founder Dashboard</h1>
              <p className="text-slate-500 font-medium">
                Managing benefits for <span className="text-blue-600 font-bold italic">{user.fullName}</span>
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Award size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</p>
                <p className="text-lg font-bold text-slate-800">Verified Founder</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl"><CheckCircle size={24} /></div>
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Active Credits</p>
                {/* Updated this number to sync with database */}
                <p className="text-lg font-bold text-slate-800">{myPerks.length} Perks Claimed</p>
              </div>
            </div>
          </div>

          {/* Claimed Perks List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 px-2 flex items-center gap-2">
              Your Active Benefits
            </h2>
            
            {myPerks.length > 0 ? (
              myPerks.map((perk: any) => (
                <motion.div 
                  key={perk._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
                       {/* This fix ensures names appear */}
                      {perk.name?.includes("AWS") ? "☁️" : "🚀"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{perk.name}</p>
                      <p className="text-xs text-slate-400 font-medium">Claimed from FounderPerks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden md:block text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      ✓ ACTIVE
                    </span>
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50">
                <p className="text-slate-400 font-medium mb-4">You haven't claimed any deals yet.</p>
                <a 
                  href="/deals" 
                  className="inline-block bg-white border border-slate-200 text-blue-600 px-6 py-2.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all"
                >
                  Browse Partner Benefits →
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}