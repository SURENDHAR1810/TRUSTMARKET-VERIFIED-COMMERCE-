import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, FileText, Package, ChevronDown, ChevronUp, Send } from 'lucide-react';
import Footer from './Footer';

interface CustomerCareViewProps {
  onBack: () => void;
}

const CustomerCareView: React.FC<CustomerCareViewProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the video verification process work?",
      a: "When you choose to buy a product, a verified agent in our warehouse records a real-time video of your specific item being inspected and packed. You watch this video to confirm the condition before the final payment is processed."
    },
    {
      q: "What if I reject the verification video?",
      a: "If the product in the video doesn't meet your expectations, you can click 'Reject Condition'. The order will be cancelled immediately, and you will not be charged."
    },
    {
      q: "How long does shipping take?",
      a: "Once you approve the verification video, the item is sealed and shipped immediately. Standard shipping takes 3-5 business days, while verified priority shipping takes 1-2 days."
    },
    {
      q: "Can I return an item after approving the video?",
      a: "Yes, you are covered by the TrustMarket Guarantee. If the item you receive differs materially from what was shown in the verification video, we offer a full refund including return shipping."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
      <div className="sticky top-0 z-40 bg-[#1e293b] border-b border-slate-700 px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg text-white">Customer Care</h1>
        </div>
      </div>

      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#1e293b] py-12 px-6 border-b border-slate-700">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How can we help you today?</h2>
              <p className="text-slate-400 text-lg mb-8">Our support team is standing by to ensure your trust is never compromised.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                 <button className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
                    <Package className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-1">Track Order</h3>
                    <p className="text-sm text-slate-500">Check the status of your shipment</p>
                 </button>
                 <button className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
                    <FileText className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-1">Returns</h3>
                    <p className="text-sm text-slate-500">Initiate a return or refund</p>
                 </button>
                 <button className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
                    <HelpCircle className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-1">FAQs</h3>
                    <p className="text-sm text-slate-500">Find answers quickly</p>
                 </button>
              </div>
           </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Options */}
            <div className="space-y-8">
               <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 bg-[#1e293b] p-4 rounded-xl border border-slate-700">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                           <Phone className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                           <p className="font-bold text-white">Call Us</p>
                           <p className="text-sm text-slate-400">+1 (800) TRUST-ME</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-[#1e293b] p-4 rounded-xl border border-slate-700">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                           <MessageCircle className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                           <p className="font-bold text-white">Live Chat</p>
                           <p className="text-sm text-slate-400">Available 24/7 for verified users</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-[#1e293b] p-4 rounded-xl border border-slate-700">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                           <Mail className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                           <p className="font-bold text-white">Email Support</p>
                           <p className="text-sm text-slate-400">support@trustmarket.com</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Send Message Form */}
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-white mb-4">Send us a message</h3>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="bg-[#0f172a] border border-slate-600 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none" />
                        <input type="email" placeholder="Email" className="bg-[#0f172a] border border-slate-600 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none" />
                     </div>
                     <select className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 text-sm text-slate-400 focus:border-indigo-500 outline-none">
                        <option>Order Issue</option>
                        <option>Verification Question</option>
                        <option>Technical Support</option>
                        <option>Other</option>
                     </select>
                     <textarea placeholder="Describe your issue..." className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-3 text-sm text-white h-32 resize-none focus:border-indigo-500 outline-none"></textarea>
                     <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                        <Send className="w-4 h-4" /> Send Message
                     </button>
                  </div>
               </div>
            </div>

            {/* FAQs */}
            <div>
               <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
               <div className="space-y-4">
                  {faqs.map((faq, index) => (
                     <div key={index} className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden">
                        <button 
                           onClick={() => setOpenFaq(openFaq === index ? null : index)}
                           className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                        >
                           <span className="font-medium text-white">{faq.q}</span>
                           {openFaq === index ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                        </button>
                        {openFaq === index && (
                           <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-700/50">
                              {faq.a}
                           </div>
                        )}
                     </div>
                  ))}
               </div>
               
               <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl border border-indigo-500/30">
                  <h4 className="font-bold text-white mb-2">Still need help?</h4>
                  <p className="text-sm text-slate-300 mb-4">Our community forum is a great place to find answers from other verified buyers.</p>
                  <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300">Visit Community Forum &rarr;</button>
               </div>
            </div>
        </div>
      </div>
      
      <Footer onNavigateToSupport={() => {}} />
    </div>
  );
};

export default CustomerCareView;