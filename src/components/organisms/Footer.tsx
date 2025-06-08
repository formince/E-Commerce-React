import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  products: {
    title: 'Ürünler',
    links: [
      { name: 'Kalemler', href: '/products/kalemler' },
      { name: 'Defterler', href: '/products/defterler' },
      { name: 'Kitaplar', href: '/products/kitaplar' },
      { name: 'Sanat Malzemeleri', href: '/products/sanat-malzemeleri' },
    ],
  },
  company: {
    title: 'Kurumsal',
    links: [
      { name: 'Hakkımızda', href: '/about' },
      { name: 'İletişim', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Kariyer', href: '/careers' },
    ],
  },
  support: {
    title: 'Destek',
    links: [
      { name: 'SSS', href: '/faq' },
      { name: 'Kargo Takip', href: '/shipping' },
      { name: 'İade Politikası', href: '/returns' },
      { name: 'Gizlilik Politikası', href: '/privacy' },
    ],
  },
};

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    text: 'Atatürk Cad. No:123, Siirt',
  },
  {
    icon: <Phone className="h-5 w-5" />,
    text: '+90 (212) 345 67 89',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    text: 'info@kirtasiye.com',
  },
];

const socialLinks = [
  {
    icon: <Facebook className="h-5 w-5" />,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-card border-t border-border">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Kırtasiye
            </h3>
            <p className="text-muted-foreground">
              20 yılı aşkın tecrübemizle kaliteli kırtasiye ürünlerini uygun fiyatlarla sunuyoruz.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-lg font-semibold text-card-foreground">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 Erinç Kırtasiye. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 