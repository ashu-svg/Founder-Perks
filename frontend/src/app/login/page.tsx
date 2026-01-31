"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        alert("Welcome back, Founder!");
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Connection error. Is your backend server running?");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Founder Login</h1>
          <p className="text-slate-500 font-medium mt-2">Welcome back! Sign in to manage your perks.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                name="email"
                required
                placeholder="admin@startup.com"
                className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 hover:shadow-blue-600/20 group"
          >
            Sign In
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 font-bold hover:underline">Register here</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}