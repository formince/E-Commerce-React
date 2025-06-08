import React, { useState } from 'react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ContactTemplate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12 relative overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-blue-50 to-white dark:from-gray-900 dark:via-slate-900 dark:to-black">
            {/* Primary Orbs */}
            <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-100/30 dark:bg-indigo-950/30 blur-[100px] animate-float" />
            <div className="absolute top-3/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-50/20 dark:bg-blue-950/20 blur-[80px] animate-float-delay" />
            <div className="absolute top-1/2 left-1/3 w-[700px] h-[700px] rounded-full bg-slate-100/30 dark:bg-slate-800/30 mix-blend-soft-light blur-[120px] animate-float" />
            
            {/* Secondary Orbs */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/20 dark:bg-indigo-900/20 blur-[90px] animate-float-delay" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-slate-100/20 dark:bg-blue-900/20 blur-[70px] animate-float" />
          </div>
          <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">İletişime Geçin</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya herhangi bir konuda yardıma ihtiyacınız varsa bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                title: 'Telefon',
                info: '+90 (555) 123 45 67',
                description: 'Pazartesi - Cumartesi'
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: 'Email',
                info: 'info@erinckirtasiye.com',
                description: '7/24 hizmetinizdeyiz'
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: 'Adres',
                info: 'İstanbul, Türkiye',
                description: 'Atatürk Cad. No: 123'
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: 'Çalışma Saatleri',
                info: '09:00 - 18:00',
                description: 'Pazar günleri kapalı'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-primary mb-1">{item.info}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mesaj Gönderin</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Adınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gönder</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.443847667509!2d28.97705931542414!3d41.03734897929747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zVGFrc2ltIE1leWRhbsSxLCBHw7xtw7zFn3N1eXUsIDM0NDM1IEJleW_En2x1L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1647095757729!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}; 