"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  
  const data = await res.json();
  
  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Welcome to the community, Founder!");
    window.location.href = "/deals"; 
  } else {
    alert(data.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-slate-100 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Join FounderPerks</h2>
        <p className="text-slate-500 mb-8">Start claiming your startup benefits today.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            onChange={(e) => setForm({...form, fullName: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" 
            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all mt-4">
            Create Account
          </button>
        </form>
      </motion.div>
    </div>
  );
}