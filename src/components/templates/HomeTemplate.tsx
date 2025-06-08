import React from 'react';
import { Header } from '../organisms/Header';
import { Hero } from '../organisms/Hero';
import { About } from '../organisms/About';
import { Advantages } from '../organisms/Advantages';
import { Footer } from '../organisms/Footer';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Advantages Section */}
        <Advantages />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}; 