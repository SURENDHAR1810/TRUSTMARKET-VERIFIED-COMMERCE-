import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Truck } from 'lucide-react';
import { Product } from '../types';
import Footer from './Footer';

interface CheckoutViewProps {
  product: Product;
  onBack: () => void;
  onSuccess: () => void;
  onNavigateToSupport: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ product, onBack, onSuccess, onNavigateToSupport }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimeout(onSuccess, 3000);
    }, 2000);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
         <div className="text-center animate-in zoom-in fade-in duration-500">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40">
               <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-slate-400 text-lg">Your verified {product.name} is on its way.</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
       <div className="max-w-4xl mx-auto p-4 md:p-8 flex-1 w-full">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8">
             <ArrowLeft className="w-5 h-5" /> Back to Product
          </button>

          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Left Form */}
             <div className="md:col-span-2 space-y-6">
                
                {/* Shipping */}
                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                   <h3 className="flex items-center gap-2 font-bold text-white mb-4">
                      <Truck className="w-5 h-5 text-indigo-400" /> Shipping Address
                   </h3>
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm focus:border-indigo-500 outline-none" />
                      <input type="text" placeholder="Last Name" className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm focus:border-indigo-500 outline-none" />
                      <input type="text" placeholder="Address" className="col-span-2 bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm focus:border-indigo-500 outline-none" />
                      <input type="text" placeholder="City" className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm focus:border-indigo-500 outline-none" />
                      <input type="text" placeholder="ZIP Code" className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm focus:border-indigo-500 outline-none" />
                   </div>
                </div>

                {/* Payment */}
                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                   <h3 className="flex items-center gap-2 font-bold text-white mb-4">
                      <CreditCard className="w-5 h-5 text-indigo-400" /> Payment
                   </h3>
                   <div className="p-4 bg-[#0f172a] border border-indigo-500/30 rounded-lg mb-4 flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                      <span className="font-bold text-white">Credit / Debit Card</span>
                   </div>
                   <div className="space-y-4 opacity-50 pointer-events-none">
                      <input type="text" placeholder="Card Number" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm" value="•••• •••• •••• 4242" readOnly />
                      <div className="grid grid-cols-2 gap-4">
                         <input type="text" placeholder="MM/YY" className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm" value="12/24" readOnly />
                         <input type="text" placeholder="CVC" className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-sm" value="•••" readOnly />
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Summary */}
             <div>
                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 sticky top-4">
                   <h3 className="font-bold text-white mb-4">Order Summary</h3>
                   <div className="flex gap-4 mb-4">
                      <img src={product.imageUrl} className="w-16 h-16 rounded-md object-cover bg-black" />
                      <div>
                         <p className="font-bold text-white text-sm line-clamp-1">{product.name}</p>
                         <p className="text-emerald-400 text-xs flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3" /> Verified</p>
                      </div>
                   </div>
                   <div className="space-y-2 border-t border-slate-700 pt-4 mb-6">
                      <div className="flex justify-between text-sm text-slate-400">
                         <span>Subtotal</span>
                         <span>₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-400">
                         <span>Verification Fee</span>
                         <span className="text-emerald-400 font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-400">
                         <span>Shipping</span>
                         <span>₹500</span>
                      </div>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-white mb-6 border-t border-slate-700 pt-4">
                      <span>Total</span>
                      <span>₹{(product.price + 500).toLocaleString('en-IN')}</span>
                   </div>

                   <button 
                     onClick={handlePlaceOrder}
                     disabled={loading}
                     className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold h-12 rounded-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                   >
                      {loading ? 'Processing...' : <><Lock className="w-4 h-4" /> Pay Securely</>}
                   </button>
                   <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> Encrypted & Secure
                   </p>
                </div>
             </div>
          </div>
       </div>
       <Footer onNavigateToSupport={onNavigateToSupport} />
    </div>
  );
};

export default CheckoutView;