"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Zap, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/deals")
      .then((res) => res.json())
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((err) => console.error("Sync Error:", err));
  }, []);

  const handleClaim = async (perkId: string, perkName: string) => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!savedUser.id) return alert("Please sign in to claim perks!");

    const res = await fetch("http://localhost:5000/api/auth/claim-perk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: savedUser.id, perkId })
    });

    if (res.ok) alert(`Success! Access instructions for ${perkName} are on your dashboard.`);
  };

  if (loading) return <div className="p-20 text-center font-black text-slate-400 italic">LOADING DEALS...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 inline-block">
            Member Exclusive
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Premium Founder Perks</h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Stop paying full price for your tech stack. We've negotiated the best deals for our community.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal: any) => (
            <motion.div 
              key={deal._id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    {deal?.name?.toLowerCase().includes("aws") ? <Cloud size={30} /> : <Zap size={30} />}
                  </div>
                  <div className="flex items-center gap-1 text-green-500 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Verified Deal</span>
                  </div>
                </div>

                {/* This fix ensures names appear clearly */}
                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  {deal?.name}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3 font-medium">
                  {deal?.description}
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Benefit Value</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">
                    {deal?.value}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleClaim(deal._id, deal.name)}
                className="group w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300"
              >
                Claim Perk
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}