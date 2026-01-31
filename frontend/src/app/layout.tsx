"use client";
import "./globals.css";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Auth sync error");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased font-sans">
        {/* --- GLOBAL NAVBAR START --- */}
        <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 h-20 flex items-center shadow-sm">
          <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
            <a href="/" className="font-bold text-2xl tracking-tighter text-blue-600 hover:opacity-80 transition-opacity">
              FounderPerks
            </a>
            
            <div className="flex gap-8 text-sm font-semibold items-center">
              <a href="/deals" className="text-slate-600 hover:text-blue-600 transition-colors">
                Browse Deals
              </a>

              {user ? (
    
                <div className="flex items-center gap-6 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
                  <a href="/dashboard" className="text-slate-900 hover:text-blue-600 transition-colors">
                    👋 Welcome, {user.fullName}
                  </a>
                  <button 
                    onClick={handleLogout} 
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <a href="/login" className="text-slate-600 px-4 py-2 hover:text-blue-600 transition-colors">
                    Sign In
                  </a>
                  <a 
                    href="/register" 
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
        {/**/}

        {/* This "children" prop is where your page content (Home, Deals, Dashboard) appears */}
        <main>{children}</main>
      </body>
    </html>
  );
}