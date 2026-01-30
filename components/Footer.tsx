import React from 'react';
import { Video, ShieldCheck, Mail, Phone, MessageCircle, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigateToSupport: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToSupport }) => {
  return (
    <footer className="bg-[#020617] border-t border-slate-800 text-slate-400 py-12 px-6 mt-auto">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-xl">
               <Video className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight text-white">TrustMarket</span>
              <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Verified Commerce</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            The world's first trust-first marketplace. We verify every product with live AI-video workflows before you pay.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="text-white font-bold mb-4">Shop Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Electronics</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Fashion & Apparel</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Home & Living</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Beauty & Personal Care</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Sports & Outdoors</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="text-white font-bold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
                <button onClick={onNavigateToSupport} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-2">
                    Customer Care Center <ArrowRight className="w-3 h-3" />
                </button>
            </li>
            <li><button onClick={onNavigateToSupport} className="hover:text-indigo-400 transition-colors">Track Your Order</button></li>
            <li><button onClick={onNavigateToSupport} className="hover:text-indigo-400 transition-colors">Returns & Refunds</button></li>
            <li><button onClick={onNavigateToSupport} className="hover:text-indigo-400 transition-colors">TrustMarket Guarantee</button></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
           <h3 className="text-white font-bold mb-4">Contact Us</h3>
           <div className="space-y-4 text-sm">
             <div className="flex items-start gap-3">
               <Phone className="w-5 h-5 text-indigo-500 mt-0.5" />
               <div>
                 <p className="text-white font-medium">1-800-TRUST-ME</p>
                 <p className="text-xs">Mon-Fri, 9am - 6pm EST</p>
               </div>
             </div>
             <div className="flex items-start gap-3">
               <Mail className="w-5 h-5 text-indigo-500 mt-0.5" />
               <div>
                 <p className="text-white font-medium">support@trustmarket.com</p>
                 <p className="text-xs">24/7 Email Support</p>
               </div>
             </div>
             <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
                <p className="text-xs leading-tight">
                  All transactions are secured and verified by our AI-powered packing verification system.
                </p>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
         <p>&copy; {new Date().getFullYear()} TrustMarket Inc. All rights reserved.</p>
         <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Security</a>
            <a href="#" className="hover:text-slate-400">Sitemap</a>
            <a href="#" className="hover:text-slate-400">Cookie Settings</a>
         </div>
      </div>
    </footer>
  );
};

export default Footer;