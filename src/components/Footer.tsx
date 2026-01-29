import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const SOCIALS = [
  { icon: <Facebook className="h-5 w-5" />, label: 'Facebook', url: 'https://www.facebook.com/p/BETA-Skills-61572529561252/', color: 'hover:bg-blue-600' },
  { icon: <Instagram className="h-5 w-5" />, label: 'Instagram', url: 'https://instagram.com', color: 'hover:bg-pink-600' },
  { icon: <Twitter className="h-5 w-5" />, label: 'Twitter', url: 'https://twitter.com', color: 'hover:bg-blue-400' },
  { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:bg-blue-800' },
];

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white pt-16 pb-0">
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-pulse-glow delay-700" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-200/10 via-pink-200/10 to-purple-200/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-gradient-x" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto rounded-3xl bg-white/5 backdrop-blur-xl border-2 border-blue-200/20 shadow-2xl p-8 md:p-14 animate-fade-in-glass">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
            {/* About Section */}
            <div className="flex-1 min-w-[220px] flex flex-col items-start animate-fade-in-up">
              <img 
                src="/lovable-uploads/c890d50b-9e2b-4f34-8958-e006a579ccea.png" 
                alt="Beta Skill Training Solutions" 
                className="h-14 w-auto mb-3 drop-shadow-2xl animate-scale-in"
              />
              <h2 className="text-2xl font-black mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">BETA SKILL</h2>
              <p className="text-gray-300 text-sm mb-4 max-w-xs">Empowering you with free, world-class skills training to start your own business and transform your future.</p>
              <a href="https://www.betaskills.co.za" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-300 hover:text-pink-300 transition-colors group cursor-pointer font-semibold text-sm">
                <span>www.betaskills.co.za</span>
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            {/* Quick Links */}
            <div className="flex-1 min-w-[180px] animate-fade-in-up delay-100">
              <h3 className="text-lg font-bold mb-4 text-blue-200">Quick Links</h3>
              <ul className="space-y-2">
                {QUICK_LINKS.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-gray-300 hover:bg-gradient-to-r hover:from-red-500 hover:via-pink-500 hover:to-red-700 hover:bg-clip-text hover:text-transparent transition-colors font-medium text-base border-b-2 border-transparent hover:border-pink-400 pb-1 duration-200 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact Section */}
            <div className="flex-1 min-w-[220px] animate-fade-in-up delay-200">
              <h3 className="text-lg font-bold mb-4 text-blue-200">Contact</h3>
              <div className="flex items-start gap-4 mb-3">
                <div className="bg-gradient-to-br from-blue-600 to-pink-500 rounded-xl p-3 flex items-center justify-center shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-blue-100 font-semibold text-sm">Address</div>
                  <div className="text-gray-300 text-sm">126 Plantation Rd.<br />Blue Hills AH, Midrand<br />Johannesburg</div>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-3">
                <div className="bg-gradient-to-br from-blue-600 to-pink-500 rounded-xl p-3 flex items-center justify-center shadow-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-blue-100 font-semibold text-sm">Phone</div>
                  <div className="text-gray-300 text-sm">011 046 9483</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-pink-500 rounded-xl p-3 flex items-center justify-center shadow-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-blue-100 font-semibold text-sm">Email</div>
                  <div className="text-gray-300 text-sm">registrar@betaskills.co.za</div>
                </div>
              </div>
            </div>
            {/* Socials Section */}
            <div className="flex-1 min-w-[160px] animate-fade-in-up delay-300">
              <h3 className="text-lg font-bold mb-4 text-blue-200">Connect</h3>
              <div className="flex gap-3">
                {SOCIALS.map((social, idx) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800/60 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-xl border border-gray-600/50 cursor-pointer animate-fade-in-glass`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-400/30 via-pink-400/30 to-purple-400/30 rounded-full my-10 animate-gradient-x" />
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 animate-fade-in-up delay-500">
            <p>© 2025 Beta Skill Training Solutions. All rights reserved.</p>
            <span className="flex items-center gap-1">Made with <span className="animate-pulse text-pink-400">♥</span> for your future.</span>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in-glass {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          animation: fadeInGlass 0.8s cubic-bezier(.4,2,.3,1) forwards;
        }
        @keyframes fadeInGlass {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 0.8s cubic-bezier(.4,2,.3,1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
