"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      container.style.setProperty('--mouse-x', `${x * 100}%`);
      container.style.setProperty('--mouse-y', `${y * 100}%`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 bg-background">
        {/* Main Orb */}
        <div 
          className="absolute left-[var(--mouse-x)] top-[var(--mouse-y)] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 dark:bg-primary/20 blur-[120px] dark:blur-[100px] transition-all duration-700 ease-out"
          style={{
            transform: 'translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))',
          }}
        />

        {/* Secondary Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px] dark:blur-[80px] animate-float" />
          <div className="absolute top-3/4 left-2/3 w-[500px] h-[500px] rounded-full bg-primary/8 dark:bg-primary/15 blur-[90px] dark:blur-[70px] animate-float [animation-delay:1s]" />
          <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[80px] dark:blur-[60px] animate-float [animation-delay:2s]" />
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-30 dark:opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Erinç Kırtasiye
          </h1>
        </motion.div>

        <motion.p 
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          Kaliteli kırtasiye ürünleri, uygun fiyatlar ve hızlı teslimat ile ihtiyacınız olan her şey burada.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
                <div className="flex items-center px-4 py-2">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ne aramıştınız? (Kalem, defter, silgi...)"
                    className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-white placeholder:text-muted-foreground px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    <span>Ara</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div 
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <a
            href="#products"
            className="group relative inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 overflow-hidden"
          >
            <span className="relative z-10">Ürünleri Keşfet</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </a>
          <a
            href="#categories"
            className="group relative inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 overflow-hidden"
          >
            <span className="relative z-10">Kategoriler</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.svg
          className="h-6 w-6 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </motion.svg>
      </motion.div>
    </div>
  );
}; 