import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Loader2, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  Video,
  ShoppingBag,
  Camera,
  ChevronRight
} from 'lucide-react';
import { Product, VerificationStatus } from '../types';
import { checkApiKeyAvailability, requestApiKey, generateProductVerificationVideo } from '../services/geminiService';
import SellerTrustChart from './SellerTrustChart';

interface VerificationModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (product: Product) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ 
  product, 
  isOpen, 
  onClose,
  onPurchase
}) => {
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.IDLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStatus(VerificationStatus.IDLE);
      setVideoUrl(null);
      setError(null);
      setVideoWatched(false);
      setActiveImageIndex(0);
    } else {
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }
    }
  }, [isOpen]);

  const handleStartVerification = async () => {
    if (!product) return;

    try {
      setStatus(VerificationStatus.CONNECTING);
      const hasKey = await checkApiKeyAvailability();
      if (!hasKey) {
        await requestApiKey();
      }

      setStatus(VerificationStatus.GENERATING);
      const url = await generateProductVerificationVideo(product.name, product.description);
      setVideoUrl(url);
      setStatus(VerificationStatus.REVIEWING);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to connect to verification worker.");
      setStatus(VerificationStatus.IDLE);
    }
  };

  const handleVideoEnded = () => {
    setVideoWatched(true);
  };

  const handleApprove = () => {
    setStatus(VerificationStatus.APPROVED);
  };

  const handlePlaceOrder = () => {
    if (product) {
      setStatus(VerificationStatus.PURCHASED);
      onPurchase(product);
      // Wait a bit before closing
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-sm transition-opacity" 
        onClick={status !== VerificationStatus.GENERATING ? onClose : undefined}
      />

      <div className="relative w-full max-w-5xl bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] border border-slate-700">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden z-50 text-slate-400"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT PANEL: Media Gallery / Video Player */}
        <div className="w-full md:w-[55%] bg-[#0f172a] p-6 flex flex-col relative">
          
          {/* CONTENT SWITCHER based on Status */}
          {(status === VerificationStatus.IDLE || status === VerificationStatus.CONNECTING || status === VerificationStatus.GENERATING) ? (
            // PRODUCT GALLERY VIEW
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center relative rounded-lg overflow-hidden bg-[#1e293b] border border-slate-700 mb-4">
                 {/* Main Image */}
                 <img 
                   src={product.images[activeImageIndex] || product.imageUrl} 
                   alt="Product view" 
                   className="max-h-full max-w-full object-contain"
                 />
                 {status === VerificationStatus.GENERATING && (
                   <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-6">
                      <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                      <h3 className="text-xl font-bold text-white">Connecting to Field Agent</h3>
                      <p className="text-slate-300 mt-2">Generating secure live verification video...</p>
                   </div>
                 )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                 {(product.images.length > 0 ? product.images : [product.imageUrl]).map((img, idx) => (
                   <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md border-2 overflow-hidden bg-[#1e293b] ${activeImageIndex === idx ? 'border-indigo-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                   >
                     <img src={img} className="w-full h-full object-cover" alt={`thumbnail ${idx}`} />
                   </button>
                 ))}
              </div>
            </div>
          ) : (
            // VIDEO PLAYER VIEW
            <div className="flex flex-col h-full items-center justify-center bg-black rounded-lg overflow-hidden border border-slate-700 relative">
               {status === VerificationStatus.REVIEWING && videoUrl && (
                  <video 
                    ref={videoRef}
                    src={videoUrl} 
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    onEnded={handleVideoEnded}
                  />
               )}
               {status === VerificationStatus.APPROVED && (
                 <div className="text-center p-8">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Authenticity Verified</h3>
                    <p className="text-slate-400">This product matches our quality standards.</p>
                 </div>
               )}
               {status === VerificationStatus.PURCHASED && (
                 <div className="text-center p-8 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/40">
                      <ShoppingBag className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Order Placed!</h3>
                    <p className="text-slate-400">Your verified item is on its way.</p>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Product Details & Actions */}
        <div className="w-full md:w-[45%] flex flex-col border-l border-slate-700 bg-[#1e293b]">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-700 flex justify-between items-start">
             <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">{product.category}</span>
                <h2 className="text-2xl font-bold text-white mt-1 leading-tight">{product.name}</h2>
             </div>
             <button onClick={onClose} className="text-slate-400 hover:text-white hidden md:block">
               <X className="w-6 h-6" />
             </button>
          </div>

          {/* Scrollable Details */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
             
             {/* Price & Seller */}
             <div className="flex items-end justify-between">
                <div>
                   <p className="text-sm text-slate-400 mb-1">Price</p>
                   <div className="text-3xl font-bold text-white">
                     ₹{product.price.toLocaleString('en-IN')}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-sm text-slate-400 mb-1">Seller</p>
                   <div className="flex items-center gap-2">
                     <span className="font-medium text-emerald-400 text-sm flex items-center gap-1">
                       <ShieldCheck className="w-3 h-3" /> Verified
                     </span>
                     <span className="text-white font-medium">{product.seller.name}</span>
                   </div>
                </div>
             </div>

             {/* Description */}
             <div className="bg-[#0f172a]/50 p-4 rounded-lg border border-slate-700">
               <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
               <p className="text-slate-400 text-sm leading-relaxed">
                 {product.description}
               </p>
             </div>

             {/* Trust Chart */}
             <div className="bg-[#0f172a]/50 p-4 rounded-lg border border-slate-700">
                <SellerTrustChart data={product.seller.trustHistory} />
             </div>

             {error && (
              <div className="p-4 border border-red-500/20 bg-red-500/10 text-red-400 rounded-lg text-sm flex gap-2 items-center">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-700 bg-[#1e293b]">
            
            {status === VerificationStatus.IDLE && (
              <button 
                onClick={handleStartVerification}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Camera className="w-5 h-5" />
                Verify Authenticity to Buy
              </button>
            )}

            {status === VerificationStatus.REVIEWING && (
              <div className="space-y-3">
                 <button 
                  onClick={handleApprove}
                  disabled={!videoWatched}
                  className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                    ${videoWatched 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                >
                  {videoWatched ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Approve Condition
                    </>
                  ) : (
                    "Watch Video to Approve"
                  )}
                </button>
                <button 
                  onClick={() => setStatus(VerificationStatus.IDLE)}
                  className="w-full py-3 text-slate-400 hover:text-white text-sm font-medium"
                >
                  Reject & Cancel
                </button>
              </div>
            )}

            {status === VerificationStatus.APPROVED && (
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] animate-pulse"
              >
                <ShoppingBag className="w-5 h-5" />
                Place Order
              </button>
            )}

             {status === VerificationStatus.PURCHASED && (
              <div className="text-center text-emerald-400 font-bold flex items-center justify-center gap-2">
                 <CheckCircle2 className="w-5 h-5" /> Order Confirmed
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerificationModal;